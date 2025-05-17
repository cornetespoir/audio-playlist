import { JSX, ReactElement } from 'react'
import { NPFContent } from './NPFContent'

interface Data {
    jsx: ReactElement[]
    song?: string
    albumArt?: string
}

/**
 * Converst the string of html to jsx
 * @returns parsed html and the current song url
 */
function parsedHTML(body: string, isPlaylist: boolean): Data {

if (!body.includes('audio')) {
    return {
        jsx: [],
        song: '',
        albumArt: ''
    }
}
const parsedHTML = new DOMParser().parseFromString(body, 'text/html')
let song = ''
let albumArt = ''

const renderNodes = (nodes: NodeListOf<ChildNode> | NodeList): ReactElement[] => {
    return Array.from(nodes).map((node, index) => {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                const element = node as HTMLElement
                const tagname = element.tagName.toLowerCase()
                const attributeList = element.getAttributeNames()

                const attributes: Record<string, string | object | null> = {}
                for (const attribute of attributeList) {
                    if (attribute != 'style')
                        attributes[attribute] = element.getAttribute(attribute)
                    if (tagname === 'img') {
                        albumArt = element.getAttribute('src') ?? ''
                    }
                    if (tagname === 'source' && attributes['src'] != null && typeof attributes['src'] === 'string'){
                       song = attributes['src']
                    }

                    if (attribute === 'style') {
                        const styles = element.getAttribute(attribute)?.split(';').map(cur => cur.split(':'))
                        const cssInObject = styles?.reduce((css: Record<string, string>, val) => {
                            const [key, value] = val;
                            const updatedKey = key.replace(/-./g, css => css.toUpperCase()[1])
                            css[updatedKey] = value;
                            return css;
                        }, {})
                        if (cssInObject)
                            attributes[attribute] = cssInObject
                    }
                }
                const newFormat = element.getAttribute('data-npf') != null
                if (newFormat) {
                     const npfData = JSON.parse(element.getAttribute('data-npf') ?? '')
                     song = ''
                     const spotifyURI = npfData?.url.includes('track') ? `spotify:track:${npfData?.url.split('/').pop()}` : ''
                    return (
                        <NPFContent key={index} isPlaylist={isPlaylist} spotifyURI={spotifyURI} npfData={npfData} />
                    )
                }

                switch (tagname) {
                    case 'blockquote':
                        if (!isPlaylist) {
                            return (
                                <div key={index} className='audio-player' style={{ background: `url(${''})` }}>
                                    <div className='audio-container'>
                                        {renderNodes(node.childNodes)}
                                    </div>
                                </div>
                            )
                        }
                        else {
                            return (
                                <blockquote key={index}>{renderNodes(node.childNodes)}</blockquote>
                            )
                        }
                    case 'h2': return null
                    case 'img':
                        return <img key={index} src={element.getAttribute('src') || ''} alt={element.getAttribute('alt') || ''} />
                    case 'p': {
                        return null
                    }
                    case 'a': {
                        return null
                    }
                    case 'br': {
                        return <br key={index} />
                    }
                    case 'audio': {
                        if (isPlaylist) return null
                        return renderNodes(node.childNodes)
                    }
                    case 'source': {
                        return null
                    }
                    default:
                        if ((tagname === 'audio' || tagname === 'iframe') && isPlaylist) {
                            return null
                        }
                        const Element = element.tagName.toLowerCase() as keyof JSX.IntrinsicElements
                        return (
                            <Element key={index} {...attributes} id={tagname === 'audio' ? 'audio-player' : ''}>
                                {renderNodes(node.childNodes)}
                            </Element>
                        )
                }
            case Node.TEXT_NODE:
                return <span key={index}>{node.textContent}</span>
            default:
                return null
        }
    }).filter(element => element !== null) as ReactElement[]
}

return {jsx: renderNodes(parsedHTML.body.childNodes), song, albumArt}
}

export {parsedHTML}
import { PostData } from '@/types/types';
import { Text } from './Text';
import { AudioPost } from './Audio';
import { ReactElement } from 'react';

interface PostProps {
    data: PostData
    isPlaylist?: boolean
}
function Post({ data, isPlaylist = false }: PostProps): ReactElement | null {
    if (data == null) {
        return null
    }

    const { type, body } = data

    if (type.toLowerCase() === 'text' && body != null) {
        return (
            <Text body={body} isPlaylist={isPlaylist} />
        )
    }

    if (type.toLowerCase() === 'audio') {
        return (<AudioPost data={data} isPlaylist />)
    }
    
    return null
}

export {
    Post
}
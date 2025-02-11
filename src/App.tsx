import {useCallback, useMemo, useState} from 'react';

import {SideBar} from './components/SideBar';
import {Content} from './components/Content';

import {api} from './services/api';

import './styles/global.scss';

interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

interface MovieProps {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
        Source: string;
        Value: string;
    }>;
    Runtime: string;
}

export function App() {
    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

    const [selectedGenreId, setSelectedGenreId] = useState(1);

    const handleClickButton = useCallback((id: number) => {
        setSelectedGenreId(id);
    }, []);

    useMemo(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
            setMovies(response.data);
        });

        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
            setSelectedGenre(response.data);
        })
    }, [selectedGenreId]);

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <SideBar
                handleClickButton={handleClickButton}
                selectedGenreId={selectedGenreId}/>
            <Content
                selectedGenre={selectedGenre}
                movies={movies}/>
        </div>
    )
}

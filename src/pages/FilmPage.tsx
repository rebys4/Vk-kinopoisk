import React from "react";
import { useParams } from "react-router-dom";
import { Group, Div, Spinner } from "@vkontakte/vkui";
import { fetchMovieById, type Movie } from "../api/kinopoiskApi";

const FilmPage: React.FC = () => {
    const { id } = useParams();
    const [movie, setMovie] = React.useState<Movie | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(true);
        fetchMovieById(id!)
            .then((data) => setMovie(data))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Spinner size="l" />;
    if (!movie) return <Div>Фильм не найден</Div>;

    return (
        <Group header={<Div>{movie.name}</Div>}>
            <Div>
                {movie.poster?.url && (
                    <img
                        src={movie.poster.url}
                        alt={movie.name}
                        style={{ width: "100%", maxHeight: 350, objectFit: "cover" }}
                    />
                )}
                <div style={{ margin: "10px 0" }}>
                    <b>Описание:</b>
                    <br />
                    {movie.description || "Нет описания"}
                </div>
                <div>Год выпуска: {movie.year || "?"}</div>
                <div>
                    Жанры:{" "}
                    {movie.genres?.map((g) => g.name).join(", ") || "Не указаны"}
                </div>
                <div>Рейтинг: {movie.rating?.kp ?? "—"}</div>
            </Div>
        </Group>
    );
};

export default FilmPage;
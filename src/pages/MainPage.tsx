// src/pages/MainPage.tsx
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    CardGrid,
    Div,
    Group,
    Spinner,
} from "@vkontakte/vkui";
import { Icon28StarsOutline, Icon20StarsFilled } from "@vkontakte/icons";

import { filmStore } from "../store/filmStore";
import { favoritesStore } from "../store/favoritesStore";
import type { Movie } from "../api/kinopoiskApi";

const MainPage: React.FC = observer(() => {
    const navigate = useNavigate();

    // Загрузка данных при монтировании
    useEffect(() => {
        filmStore.loadGenres();
        filmStore.loadMovies();
    }, []);

    // Бесконечный скролл
    useEffect(() => {
        const onScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200 &&
                !filmStore.loading
            ) {
                filmStore.loadMore();
            }
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleGenreClick = (genre: string) => {
        filmStore.setFilters({ genres: [genre] });
    };

    return (
        <Group header={<Div>Список фильмов</Div>}>
            {/* Фильтры по жанрам */}
            <Div>
                <div style={{ marginBottom: 16 }}>
                    {filmStore.allGenres.slice(0, 7).map((g) => (
                        <Button
                            key={g.slug}
                            size="s"
                            mode={
                                filmStore.filters.genres?.includes(g.name)
                                    ? "primary"
                                    : "secondary"
                            }
                            style={{ marginRight: 6, marginBottom: 6 }}
                            onClick={() => handleGenreClick(g.name)}
                        >
                            {g.name}
                        </Button>
                    ))}
                </div>
            </Div>

            {/* Спиннер при первой загрузке */}
            {filmStore.loading && filmStore.movies.length === 0 ? (
                <Spinner size="l" />
            ) : (
                <CardGrid size="l">
                    {(filmStore.movies ?? []).map((movie: Movie) => (
                        <div
                            key={movie.id}
                            style={{ position: "relative" }}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                        >
                            {/* Кнопка избранного */}
                            <Button
                                mode="tertiary"
                                style={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    zIndex: 1,
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    favoritesStore.toggle(Number(movie.id));
                                }}
                            >
                                {favoritesStore.ids.includes(Number(movie.id)) ? (
                                    <Icon20StarsFilled />
                                ) : (
                                    <Icon28StarsOutline />
                                )}
                            </Button>

                            <Card>
                                <Div>
                                    {/* Постер или плейсхолдер */}
                                    {movie.poster?.url ? (
                                        <img
                                            src={movie.poster.url}
                                            alt={movie.name}
                                            style={{
                                                width: "100%",
                                                maxHeight: 250,
                                                objectFit: "cover",
                                                borderRadius: 8,
                                            }}
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                width: "100%",
                                                height: 250,
                                                background: "#333",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#888",
                                                borderRadius: 8,
                                            }}
                                        >
                                            Нет постера
                                        </div>
                                    )}

                                    {/* Название, год, рейтинг */}
                                    <div style={{ marginTop: 8, fontWeight: 600 }}>
                                        {movie.name}
                                    </div>
                                    <div>Год: {movie.year ?? "—"}</div>
                                    <div>
                                        Рейтинг:{" "}
                                        {movie.rating?.kp
                                            ? movie.rating.kp.toFixed(1)
                                            : movie.rating?.imdb
                                                ? movie.rating.imdb.toFixed(1)
                                                : "—"}
                                    </div>
                                </Div>
                            </Card>
                        </div>
                    ))}
                </CardGrid>
            )}

            {/* Спиннер при подгрузке следующих страниц */}
            {filmStore.loading && filmStore.movies.length > 0 && (
                <Div>
                    <Spinner size="s" />
                </Div>
            )}

            {/* Ошибка */}
            {filmStore.error && (
                <Div style={{ color: "red" }}>{filmStore.error}</Div>
            )}
        </Group>
    );
});

export default MainPage;
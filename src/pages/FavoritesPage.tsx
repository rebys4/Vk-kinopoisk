// import React, { useState, useEffect } from "react";
// import { Group, Div, Spinner, CardGrid, Card } from "@vkontakte/vkui";
// import { observer } from "mobx-react-lite";
// import { fetchMovieById, type Movie } from "../api/kinopoiskApi";
// import { favoritesStore } from "../store/favoritesStore";

// const FavoritesPage: React.FC = observer(() => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function load() {
//       setLoading(true);
//       const arr: Movie[] = [];
//       for (const id of favoritesStore.ids) {
//         try {
//           const m = await fetchMovieById(id);
//           arr.push(m);
//         } catch {}
//       }
//       setMovies(arr);
//       setLoading(false);
//     }
//     load();
//   }, [favoritesStore.ids.join(",")]); 

//   if (loading) return <Spinner size="l" />;

//   return (
//     <Group header={<Div>Избранные фильмы</Div>}>
//       {movies.length === 0 ? (
//         <Div>У вас ещё нет избранных фильмов.</Div>
//       ) : (
//         <CardGrid size="l">
//           {movies.map((movie) => (
//             <Card key={movie.id}>
//               <Div>
//                 {movie.poster?.url && (
//                   <img
//                     src={movie.poster.url}
//                     alt={movie.name}
//                     style={{
//                       width: "100%",
//                       maxHeight: 200,
//                       objectFit: "cover",
//                       borderRadius: 8,
//                     }}
//                   />
//                 )}
//                 <div style={{ fontWeight: 600, marginTop: 8 }}>
//                   {movie.name}
//                 </div>
//                 <div>Год: {movie.year ?? "—"}</div>
//               </Div>
//             </Card>
//           ))}
//         </CardGrid>
//       )}
//     </Group>
//   );
// });

// export default FavoritesPage;
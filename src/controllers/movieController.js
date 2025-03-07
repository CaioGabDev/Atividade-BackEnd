const Movie = require("../models/Movie");
const MovieList = require("../models/MovieList");

const lista = new MovieList();

lista.addMovie(new Movie("Deadpool", "Careca", "20:30:00", "Ação"));

lista.addMovie(new Movie("Wolverine", "Garra", "22:33:00", "Ação"));

lista.addMovie(new Movie("Logan Paul", "Freefire", "2:17:00", "Ação"));

const router = {
    addMovie: (req, res) => {
        try {
            const { title, actor, duration, gender } = req.body;
            if (!title || !actor || !duration ||! gender) {
                throw new Error("Preencha todos os campos!");
            }
            const film = new Movie(title, actor, duration, gender);
            lista.addMovie(film);
            res.status(200).json({ message: "Filme criado com sucesso", film });
        } catch (error) {
            res.status(400).json({
                message: "Erro ao adicionar filme",
                error: error.message,
            });
        }
    },

    getAllMovies: (req, res) => {
        try {
            const movies = lista.getAllMovies();
            res.status(200).json(movies);
        } catch (error) {
            res.status(404).json({
                message: "Erro ao buscar filme",
                error: error.message,
            });
        }
    },

    getMovieById: (req, res) => {
        try {
            const id = req.params.id;
            res.status(200).json(lista.getMovieById(id));
        } catch (error) {
            res.status(404).json({
                message: "Erro ao buscar filme por id",
                error: error.message,
            });
        }
    },

    updateMovie: (req, res) => {
        try {
            res.status(200).json(lista.updateMovie(req.params.id, req.body));
        } catch (error) {
            res.status(404).json({
                message: "Erro ao atualizar",
                error: error.message,
            });
        }
    },

    deleteMovie: (req, res) => {
        try {
            const movie = req.params.id;
            lista.deleteMovie(movie);
            res.status(200).json({
                message: "Filme deletado com sucesso",
                movie,
            });
        } catch (error) {
            res.status(404).json({
                message: "Erro ao deletar filme",
                error: error.message,
            });
        }
    },
};

module.exports = router;
import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie-dto';
import { get } from 'http';

@Injectable()
export class MoviesService {
    //임의 데이터베이스
    private movies : Movie[] = [];

    getAll(): Movie[]{
        return this.movies;
    }

    getOne(movieId:number): Movie{
        const movie = this.movies.find(movie => movie.id === +movieId); //+id는 string을 number로 바꿔줌 / parseint랑 같은 기능
        if(!movie){
            throw new NotFoundException(`Movie not found with ID : ${movieId}`);
        }
        return movie; 
    }

    deleteOne(movieId:number){
        this.getOne(movieId);
        this.movies = this.movies.filter(movie => movie.id !== +movieId);
    }

    create(movieData : CreateMovieDto){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        });
    }

    update(movieId:number, updateData : UpdateMovieDto){
        const movie = this.getOne(movieId);
        this.deleteOne(movieId);
        this.movies.push({...movie, ...updateData});
    }

}

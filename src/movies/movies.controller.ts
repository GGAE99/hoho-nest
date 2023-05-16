import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie-dto';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) {

    }
    
    //영화 년도 검색
    @Get("search")
    search(@Query("year") searchingYear: string) {
        return `We are searching for a movie with a movie made after : ${searchingYear}`;
    }

    //영화 전체 검색
    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    //영화 검색
    @Get(':id')
    getOne(@Param('id') movieId: number): Movie {
        return this.moviesService.getOne(movieId);
    }

    //영화 생성
    @Post()
    create(@Body() movieData: CreateMovieDto) {
        return this.moviesService.create(movieData);
    }

    //영화 삭제
    @Delete(':id')
    remove(@Param('id') movieId: number) {
        return this.moviesService.deleteOne(movieId);
    }

    //영화 부분 업데이트
    @Patch(':id')
    patch(@Param('id') movieId: number, @Body() updateData : UpdateMovieDto) {
        return this.moviesService.update(movieId, updateData);
    }

    //영화 업데이트
    @Put()
    updateHoleMovie() {
        return "This will update hole movies";
    }
}
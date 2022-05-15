import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameRepository } from './games.repository';

@Injectable()
export class GamesService {
  constructor(private _gameRepository: GameRepository) {}

  create(createGameDto: CreateGameDto) {
    return this._gameRepository.create(createGameDto);
  }

  findAll() {
    return this._gameRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return this._gameRepository.update(id, updateGameDto);
  }

  remove(id: number) {
    return this._gameRepository.deleteById(id);
  }

  getGamesByKeyword(param: { text: string }) {
    return this._gameRepository.findByKeyword(param);
  }
}

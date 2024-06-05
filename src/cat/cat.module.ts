import { Module } from '@nestjs/common';
import { CatService } from './application/cat.service';
import { CatController } from './infrastructure/cat.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}

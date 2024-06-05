import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatService } from '../application/cat.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('cat')
@ApiTags('Cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get('/all')
  findAllBreeds() {
    return this.catService.findAllBreeds();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catService.findOne(id);
  }

  @Get('cat/search')
  @ApiQuery({ name: 'attachedFile', required: false })
  search(
    @Query('name') name: string,
    @Query('attachedFile')
    attachedFile?: number,
  ) {
    return this.catService.search({ name, attachedFile });
  }
}

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { QueryParameterDto } from '../infrastructure/dto/query-parameters.dto';
import { envs } from 'src/config/envs';

@Injectable()
export class CatService {
  private readonly apiKey = envs.apiKey;
  private readonly baseUrl = envs.apiCatUrl;

  constructor(private readonly httpService: HttpService) {}

  private async fetchBreeds(url: string, params?: Record<string, string>) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: { ...params, 'api-key': this.apiKey },
        }),
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error('Error al obtener datos de la API');
    }
  }

  async findAllBreeds() {
    const url = `${this.baseUrl}?limit=10&page=0`;
    return this.fetchBreeds(url);
  }

  async findOne(id: string) {
    const url = `${this.baseUrl}/${id}`;
    return this.fetchBreeds(url);
  }

  async search(q: QueryParameterDto) {
    const url = `${this.baseUrl}/search`;
    return this.fetchBreeds(url, {
      q: q.name,
      attach_image: `${q.attachedFile}`,
    });
  }
}

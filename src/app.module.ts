import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CatModule } from './cat/cat.module';

@Module({
  imports: [AuthModule, CatModule],
})
export class AppModule {}

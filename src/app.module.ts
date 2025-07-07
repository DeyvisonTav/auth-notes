import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/modules/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

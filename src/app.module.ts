import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI || "mongodb://root:password@127.0.0.1:27017/nest-backend-assignment?authSource=admin"), ProductModule],
  controllers: [AppController],
  providers: [AppService], 

})
export class AppModule {}
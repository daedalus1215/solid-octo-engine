import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';


@Module({
    imports: [
        MongooseModule.forRootAsync({ //nestjs provides us this in order to load up these configs 
            imports: [ConfigModule], // ConfigModule is exporting the ConfigService for us.
            useFactory: (configService: ConfigService) => ({ // tell nest how to create the mongoose
                uri: configService.get<string>('MONGODB_URI'),
            }),
            inject: [ConfigService] // tell nestJS of the providers we are injecting
        })],
    providers: []
})
export class DatabaseModule {
    static forFeature(models: ModelDefinition[]) {
        return MongooseModule.forFeature(models);
    }
}
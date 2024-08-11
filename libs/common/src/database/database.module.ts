import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forRootAsync({ //nestjs provides us this in order to load up these configs 
        imports: [ConfigModule], // ConfigModule is exporting the ConfigService for us.
        useFactory: (configService:ConfigService) => ({ // tell nest how to create the mongoose
            uri: configService.get('MONGODB_URI'),
        }),
        inject: [ConfigService] // tell nestJS of the providers we are injecting
    })]
})
export class DatabaseModule { }

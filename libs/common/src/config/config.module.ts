import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
    imports: [
        NestConfigModule.forRoot({ // we are doing this, because we want to change configs in one place. So we are creating a wrapper here.
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required()
            }),
        })
    ],
    providers: [ConfigService],
    exports: [ConfigService]
})
export class ConfigModule { }

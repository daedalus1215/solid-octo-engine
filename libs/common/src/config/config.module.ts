import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from 'aws-sdk';

@Module({
    imports: [NestConfigModule.forRoot()], // we are doing this, because we want to change configs in one place. So we are creating a wrapper here.
    providers: [ConfigService],
    exports: [ConfigService]
})
export class ConfigModule { }

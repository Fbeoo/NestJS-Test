import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class TrimPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        Object.keys(value).forEach(key => {
            if (value[key] === null || value[key] === undefined) {
                throw new BadRequestException(`${key} is required`);
            }

            if (typeof value[key] === 'string' && value[key].trim() === '') {
                throw new BadRequestException(`${key} cannot be empty`);
            }

            value[key] = value[key].trim();
        });

        return value;
    }
}
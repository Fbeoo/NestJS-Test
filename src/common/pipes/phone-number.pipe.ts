import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class IsPhoneNumberPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const val = parseInt(value);

        if (isNaN(val)) {
            throw new BadRequestException('Validation failed');
        }

        return val;
    }
}
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PathMiddleware implements NestMiddleware {
    use (req: Request, res: Response, next: NextFunction) {
        console.log('Path middleware');
        next(); // Goi next de chuyen tiep request
    }
}
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RedirectMiddleware implements NestMiddleware {
    use (req: Request, res: Response, next: NextFunction) {
        console.log('Redirect middleware');
        next(); // Goi next de chuyen tiep request
    }
}
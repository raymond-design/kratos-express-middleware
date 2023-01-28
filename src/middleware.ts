import { ory } from './config';
import { FrontendApiToSessionRequest } from '@ory/client';
import { Request, Response, NextFunction } from 'express';

// Middleware for must be authenticated endpoints
export const mustBeAuthenticated = async (redirect?: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const sessionParams: FrontendApiToSessionRequest = {
                xSessionToken: req.header("x-session-token"), cookie: req.header("cookie")
            }
                
            const orySession = (await ory.frontend.toSession(sessionParams)).data;
            
            res.locals.oryIdentity = {
                session_id: orySession.id,
                traits: {
                    id: orySession.identity.id,
                    state: orySession.identity.state!,
                    email: orySession.identity.traits.email
                }
            };
            next();
        } catch (error) {
            console.log("User Unauthenticated!");
            // Redirect URL if unauthenticated
            if (redirect) {
                return res.redirect(redirect);
            }
            // Otherwise throw error by default
            return res.status(401).json("User Unauthenticated!");
        }
    };
}

// Parse identity but also don't need to be authenticated
export const canBeAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionParams: FrontendApiToSessionRequest = {
            xSessionToken: req.header("x-session-token"), cookie: req.header("cookie")
        }
                
        const orySession = (await ory.frontend.toSession(sessionParams)).data;
            
        res.locals.oryIdentity = {
            session_id: orySession.id,
            traits: {
                id: orySession.identity.id,
                state: orySession.identity.state!,
                email: orySession.identity.traits.email
            }
        };
        res.locals.auth = true;
        next();
    } catch (error) {
        res.locals.auth = false;
        next();
    }
}
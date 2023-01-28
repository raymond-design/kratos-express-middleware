# ExpressJS Kratos Middleware
Simple ExpressJS auth middleware for ory kratos.

## Usage
- ```npm i kratos-express-middleware```
- Set environment variable ```ORY_PROJECT_URL```<br>

### Throw error if not authenticated
If user is authenticated, res.locals.oryIdentity will be populated. If user is not authenticated, throw error <br>

```
import { mustBeAuthenticated } from 'kratos-express-middleware';

router.put('/user',
    mustBeAuthenticated,
    controller.updateUser);
```

### Redirect to url if not authenticated
If user is authenticated, res.locals.oryIdentity will be populated. If user is not authenticated, redirect <br>

```
import { mustBeAuthenticated } from 'kratos-express-middleware';

router.put('/user',
    mustBeAuthenticated("/redirect-url"),
    controller.updateUser);
```

### Optional authentication
In this case: If user is authenticated, res.locals.auth will be True and res.locals.oryIdentity will be populated. If user is not authenticated, res.locals.auth will be False <br>

```
import { canBeAuthenticated } from 'kratos-express-middleware';

router.put('/user',
    canBeAuthenticated,
    controller.updateUser);
```

## Roadmap
This is just a simple demo working with ory's default identity schema in ExpressJS. Feel free to fork and customize.
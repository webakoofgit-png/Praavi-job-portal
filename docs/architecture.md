# Architecture and trust boundaries

The web app renders public discovery pages server-side and uses protected route groups for candidate, employer, and administrator experiences. The NestJS API is the authorization boundary: browser checks are never sufficient for role or business ownership decisions.

Provider-dependent capabilities use explicit adapters:

- Registration verification codes are temporarily disabled.
- Phone is an optional profile contact field.
- Storage: local private directory for development, private S3-compatible bucket in production
- Resume extraction: BullMQ job with a parser adapter

Contact events are immutable analytics events and are not applications. An application exists only after a candidate submits a portal application and the API commits the `Application` record.

Material edits to an active job should move it back to `PENDING` and create an audit record. All administrator mutations should record actor, entity, before/after state, timestamp, and a privacy-preserving IP hash.

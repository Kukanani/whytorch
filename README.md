# WhyTorch

WhyTorch is a website designed to explain PyTorch functions. [Visit the live site](https://whytorch.org).

## Build and test locally

```bash
npm i
npx eleventy
DOCKER_BUILDKIT=0 docker buildx build . -t whytorch
docker stop whytorch
docker run --rm -d -p 80:80 -p 8080:8080 --name whytorch whytorch
```

## Deployment notes

* WhyTorch is hosted using fly.io. It's accessible at both the root URL (see above), and on fly.io via https://whytorch.fly.dev.
* The PyTorch URL redirect is done automatically via the nginx configuration (`nginx.conf`).

## Contributing

WhyTorch doesn't cover every function (try the sidebar on the site to see a list of unimplemented functions). That's where you can come in and help!

1. Find a function you want to document - it should already have a `.js` file in `public/js/`
1. Read some existing files (`public/js/torch.add.js`, `public/js/torch.gather.js`)
1. Fork this repo
1. Write your function's js file
1. Build and test locally using the instructions above
1. Commit, push, and merge request

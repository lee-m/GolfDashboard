# My Golf Dashboard
A React and Typescript web application that is primarily for 1) finally getting round to poking at Typescript and React and 2) to scratch some of my own itches around golfing tools out there and to make something that I can (hopefully!) use in my ongoing quest to merely be a bad golfer rather than a truly terrible one.

This idea and general UI design was originally inspired by [WattsBoard](https://www.wattsboard.com/) which I've used in the past to track cycling per formance stats.

## Architecture
### Front End
The front-end is a Typescript/React web application that communicates to an ASP.NET Core (v5) backend for the CRUD operations. Since it's an SPA I take advantage of hosting the live site via Azure Blob Storage's static website capability with a CDN in front of it to handle enforcing HTTPs and all the certificate management. 

To aovid getting a bunch of 404's refreshing a page other than /, the the underlying CDN has some URL rewrite rules in place to keep all requests hitting /.

The main libraries used on the front-end are:
- [DevExtreme React Components](https://js.devexpress.com/) for various components (grid, rich text editor etc.) that no-one wants to write themselves.
- [Tailwind CSS](https://tailwindcss.com/) for making things look pretty.
- [Bootstrap Icons](https://icons.getbootstrap.com/) for some of the icons used in various places.
- [react-spring](https://react-spring.io/) for handling animations since we are in a Web 2.0 world after all and having things pop in and out of view is so 1995.
- [react-spinners](https://www.davidhu.io/react-spinners/) for loading indicators.
- [react-toastify](https://fkhadra.github.io/react-toastify) for super spiffy toasts.
- [react-query](https://react-query.tanstack.com/) for handling all the communication with the backend API.

### Backend:
The backend is an ASP.NET (.NET 5) API running on Azure App Service. Since the data volumes are very low and to keep things simple, everything is stored in a SQLite database accessed via EntityFramework Core.

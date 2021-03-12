import React from "react";
// Always install react-router-dom for dom based web apps
import { BrowserRouter, Route } from "react-router-dom";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import Header from "./Header";

// We never use <a /> link tags in React Apps. Clicking a
// link tag browser makes a request to url /pagetwo and
// development server responds with index.html file.
// Browser receives index.html file, dumps old HTML file
// it was showing (including all of our React/Redux state)
// data!
// index.html file lists our JS files in script tags,
// browser downloads and executes these scripts.
// Our app starts up again but without our React/Redux state
// data we just had before.

// For React apps we use <Link /> tags from react-router-dom
// When clicking a <Link /> tag React Router prevents
// browser from navigation to the new page and fetching
// new index.html file!
// URL still changes. React Router 'History' component sees
// updated URL, takes URL and sends it to BrowserRouter.
// BrowserRouter communicates the URL to Route components.
// Route components re-render to show new set of components.

// Term Single Page App (SPA) comes from this. User loads
// a single html file and navigate around it. User navigates
// inside a single html document, we are just hiding and
// showing different components based on the url. We are
// tricking the user into thinking they are going to
// different pages, when we are just showing and hiding
// different components.

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
          <Header />
          {/* Route checks path as URL.contains(path) so eg.
      /streams/new will also show our root '/' component
      StreamList as URL contains '/'. To prevent this
      we specify exact */}
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit" exact component={StreamEdit} />
          <Route path="/streams/delete" exact component={StreamDelete} />
          <Route path="/streams/show" exact component={StreamShow} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;

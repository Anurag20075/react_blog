import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import HomeBlogLandingPage from "pages/home-blog-landing-page";
import AboutContactPage from "pages/about-contact-page";
import SearchResultsPage from "pages/search-results-page";
import AuthorProfilePage from "pages/author-profile-page";
import ArticleDetailPage from "pages/article-detail-page";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Header />
        <RouterRoutes>
          <Route path="/" element={<HomeBlogLandingPage />} />
          <Route path="/home-blog-landing-page" element={<HomeBlogLandingPage />} />
          <Route path="/about-contact-page" element={<AboutContactPage />} />
          <Route path="/search-results-page" element={<SearchResultsPage />} />
          <Route path="/author-profile-page" element={<AuthorProfilePage />} />
          <Route path="/article-detail-page" element={<ArticleDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
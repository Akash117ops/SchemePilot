import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";

import {
  getSchemes,
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../services/api";

function BrowseSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(
    new Set()
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [favoriteLoadingId, setFavoriteLoadingId] =
    useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] =
    useState("All");
  const [genderFilter, setGenderFilter] =
    useState("All");
  const [sortBy, setSortBy] = useState("name");

  const [currentPage, setCurrentPage] = useState(1);

  const schemesPerPage = 6;

  // ================================
  // LOAD SCHEMES + FAVORITES
  // ================================

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError("");

        const [schemeData, favoriteData] =
          await Promise.all([
            getSchemes(),
            getFavorites(),
          ]);

        setSchemes(
          Array.isArray(schemeData)
            ? schemeData
            : []
        );

        setFavoriteIds(
          new Set(
            Array.isArray(favoriteData)
              ? favoriteData.map(
                  (scheme) => scheme.id
                )
              : []
          )
        );
      } catch (err) {
        setError(
          err.message ||
            "Unable to load schemes. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // ================================
  // FILTER OPTIONS
  // ================================

  const states = useMemo(() => {
    return [
      "All",
      ...new Set(
        schemes
          .map((scheme) => scheme.state)
          .filter(Boolean)
          .filter(
            (state) =>
              state.toLowerCase() !== "any"
          )
      ),
    ];
  }, [schemes]);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        schemes
          .map((scheme) => scheme.category)
          .filter(Boolean)
          .filter(
            (category) =>
              category.toLowerCase() !== "any"
          )
      ),
    ];
  }, [schemes]);

  const genders = useMemo(() => {
    return [
      "All",
      ...new Set(
        schemes
          .map((scheme) => scheme.gender)
          .filter(Boolean)
          .filter(
            (gender) =>
              gender.toLowerCase() !== "any"
          )
      ),
    ];
  }, [schemes]);

  // ================================
  // SEARCH + FILTER + SORT
  // ================================

  const filteredSchemes = useMemo(() => {
    let result = [...schemes];

    const search = searchTerm
      .trim()
      .toLowerCase();

    if (search) {
      result = result.filter((scheme) => {
        return (
          scheme.name
            ?.toLowerCase()
            .includes(search) ||
          scheme.description
            ?.toLowerCase()
            .includes(search) ||
          scheme.benefits
            ?.toLowerCase()
            .includes(search)
        );
      });
    }

    if (stateFilter !== "All") {
      result = result.filter(
        (scheme) =>
          scheme.state?.toLowerCase() ===
            stateFilter.toLowerCase() ||
          scheme.state?.toLowerCase() === "any"
      );
    }

    if (categoryFilter !== "All") {
      result = result.filter(
        (scheme) =>
          scheme.category?.toLowerCase() ===
            categoryFilter.toLowerCase() ||
          scheme.category?.toLowerCase() === "any"
      );
    }

    if (genderFilter !== "All") {
      result = result.filter(
        (scheme) =>
          scheme.gender?.toLowerCase() ===
            genderFilter.toLowerCase() ||
          scheme.gender?.toLowerCase() === "any"
      );
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        (a.name || "").localeCompare(
          b.name || ""
        )
      );
    }

    if (sortBy === "name-desc") {
      result.sort((a, b) =>
        (b.name || "").localeCompare(
          a.name || ""
        )
      );
    }

    if (sortBy === "income-low") {
      result.sort(
        (a, b) =>
          (a.income_limit ?? Infinity) -
          (b.income_limit ?? Infinity)
      );
    }

    if (sortBy === "income-high") {
      result.sort(
        (a, b) =>
          (b.income_limit ?? 0) -
          (a.income_limit ?? 0)
      );
    }

    return result;
  }, [
    schemes,
    searchTerm,
    stateFilter,
    categoryFilter,
    genderFilter,
    sortBy,
  ]);

  // ================================
  // PAGINATION
  // ================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredSchemes.length / schemesPerPage
    )
  );

  const paginatedSchemes =
    filteredSchemes.slice(
      (currentPage - 1) * schemesPerPage,
      currentPage * schemesPerPage
    );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    stateFilter,
    categoryFilter,
    genderFilter,
    sortBy,
  ]);

  // ================================
  // FAVORITE TOGGLE
  // ================================

  const handleFavoriteToggle = async (
    schemeId
  ) => {
    try {
      setFavoriteLoadingId(schemeId);
      setError("");

      const isFavorite =
        favoriteIds.has(schemeId);

      if (isFavorite) {
        await removeFavorite(schemeId);

        setFavoriteIds((current) => {
          const updated = new Set(current);
          updated.delete(schemeId);
          return updated;
        });
      } else {
        await addFavorite(schemeId);

        setFavoriteIds((current) => {
          const updated = new Set(current);
          updated.add(schemeId);
          return updated;
        });
      }
    } catch (err) {
      setError(
        err.message ||
          "Unable to update your saved schemes."
      );
    } finally {
      setFavoriteLoadingId(null);
    }
  };

  // ================================
  // CLEAR FILTERS
  // ================================

  const clearFilters = () => {
    setSearchTerm("");
    setStateFilter("All");
    setCategoryFilter("All");
    setGenderFilter("All");
    setSortBy("name");
  };

  // ================================
  // LOADING
  // ================================

  if (isLoading) {
    return (
      <div className="browse-page">
        <div className="browse-loading">
          <Loader2
            className="browse-spinner"
            size={34}
          />

          <p>
            Loading government schemes...
          </p>
        </div>
      </div>
    );
  }

  // ================================
  // ERROR
  // ================================

  if (error && schemes.length === 0) {
    return (
      <div className="browse-page">
        <div className="browse-error">
          <h2>Unable to load schemes</h2>

          <p>{error}</p>

          <button
            className="browse-retry-button"
            onClick={() =>
              window.location.reload()
            }
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // ================================
  // PAGE
  // ================================

  return (
    <div className="browse-page">
      {/* HEADER */}

      <header className="browse-header">
        <div>
          <Link
            to="/dashboard"
            className="browse-back-link"
          >
            ← Back to Dashboard
          </Link>

          <h1>
            Browse Government Schemes
          </h1>

          <p>
            Explore government schemes and find
            programs that may match your needs.
          </p>
        </div>
      </header>

      <main className="browse-container">

        {/* ERROR MESSAGE */}

        {error && (
          <div className="favorites-error">
            {error}
          </div>
        )}

        {/* SEARCH + FILTERS */}

        <section className="browse-controls">

          {/* SEARCH */}

          <div className="browse-search">
            <Search size={20} />

            <input
              type="text"
              placeholder="Search schemes..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
            />

            {searchTerm && (
              <button
                className="clear-search"
                onClick={() =>
                  setSearchTerm("")
                }
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* FILTER HEADING */}

          <div className="browse-filter-heading">
            <SlidersHorizontal size={19} />

            <span>
              Filters & sorting
            </span>
          </div>

          {/* FILTERS */}

          <div className="browse-filters">

            {/* STATE */}

            <select
              value={stateFilter}
              onChange={(event) =>
                setStateFilter(
                  event.target.value
                )
              }
            >
              {states.map((state) => (
                <option
                  key={state}
                  value={state}
                >
                  State: {state}
                </option>
              ))}
            </select>

            {/* CATEGORY */}

            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(
                  event.target.value
                )
              }
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  Category: {category}
                </option>
              ))}
            </select>

            {/* GENDER */}

            <select
              value={genderFilter}
              onChange={(event) =>
                setGenderFilter(
                  event.target.value
                )
              }
            >
              {genders.map((gender) => (
                <option
                  key={gender}
                  value={gender}
                >
                  Gender: {gender}
                </option>
              ))}
            </select>

            {/* SORT */}

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(
                  event.target.value
                )
              }
            >
              <option value="name">
                Sort: A–Z
              </option>

              <option value="name-desc">
                Sort: Z–A
              </option>

              <option value="income-low">
                Income limit: Low to High
              </option>

              <option value="income-high">
                Income limit: High to Low
              </option>
            </select>

            {/* CLEAR */}

            <button
              className="clear-filters-button"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          </div>
        </section>

        {/* RESULTS HEADER */}

        <section className="browse-results-header">
          <div>
            <h2>
              Available Schemes
            </h2>

            <p>
              Showing{" "}
              <strong>
                {filteredSchemes.length}
              </strong>{" "}
              scheme
              {filteredSchemes.length !== 1
                ? "s"
                : ""}
            </p>
          </div>

          {/* FAVORITES LINK */}

          <Link
            to="/favorites"
            className="favorites-explore-link"
          >
            <Heart size={17} />

            Saved Schemes

            <ArrowRight size={17} />
          </Link>
        </section>

        {/* EMPTY STATE */}

        {paginatedSchemes.length === 0 ? (
          <div className="browse-empty">
            <Search size={42} />

            <h3>
              No schemes found
            </h3>

            <p>
              Try changing your search or
              removing some filters.
            </p>

            <button
              className="browse-retry-button"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* SCHEME CARDS */}

            <section className="scheme-grid">
              {paginatedSchemes.map(
                (scheme, index) => {
                  const isFavorite =
                    favoriteIds.has(
                      scheme.id
                    );

                  const isFavoriteLoading =
                    favoriteLoadingId ===
                    scheme.id;

                  return (
                    <motion.article
                      key={scheme.id}
                      className="browse-scheme-card"
                      initial={{
                        opacity: 0,
                        y: 18,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        delay:
                          index * 0.05,
                      }}
                    >

                      {/* CARD TOP */}

                      <div className="scheme-card-top">

                        <div className="scheme-card-tags">

                          <span className="scheme-category">
                            {scheme.category ||
                              "Government Scheme"}
                          </span>

                          {scheme.state &&
                            scheme.state.toLowerCase() !==
                              "any" && (
                              <span className="scheme-state">
                                {scheme.state}
                              </span>
                            )}
                        </div>

                        {/* HEART */}

                        <button
                          className={`scheme-favorite-button ${
                            isFavorite
                              ? "saved"
                              : ""
                          }`}
                          onClick={() =>
                            handleFavoriteToggle(
                              scheme.id
                            )
                          }
                          disabled={
                            isFavoriteLoading
                          }
                          title={
                            isFavorite
                              ? "Remove from favorites"
                              : "Save scheme"
                          }
                        >
                          {isFavoriteLoading ? (
                            <Loader2
                              size={19}
                              className="favorites-spinner"
                            />
                          ) : (
                            <Heart
                              size={19}
                              fill={
                                isFavorite
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          )}
                        </button>
                      </div>

                      {/* NAME */}

                      <h3>
                        {scheme.name}
                      </h3>

                      {/* DESCRIPTION */}

                      <p className="scheme-card-description">
                        {scheme.description}
                      </p>

                      {/* BENEFITS */}

                      <div className="scheme-card-benefit">
                        <span>
                          Benefits
                        </span>

                        <p>
                          {scheme.benefits}
                        </p>
                      </div>

                      {/* FOOTER */}

                      <div className="scheme-card-footer">

                        <span>
                          Age:{" "}
                          {scheme.min_age}–
                          {scheme.max_age}
                        </span>

                        <Link
                          to={`/schemes/${scheme.id}`}
                          className="scheme-view-link"
                        >
                          View details

                          <ArrowRight
                            size={17}
                          />
                        </Link>
                      </div>
                    </motion.article>
                  );
                }
              )}
            </section>

            {/* PAGINATION */}

            {totalPages > 1 && (
              <div className="browse-pagination">

                <button
                  disabled={
                    currentPage === 1
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) => page - 1
                    )
                  }
                >
                  <ChevronLeft
                    size={18}
                  />

                  Previous
                </button>

                <div className="page-numbers">
                  {Array.from(
                    {
                      length: totalPages,
                    },
                    (_, index) =>
                      index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      className={
                        currentPage ===
                        page
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setCurrentPage(page)
                      }
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) => page + 1
                    )
                  }
                >
                  Next

                  <ChevronRight
                    size={18}
                  />
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default BrowseSchemes;
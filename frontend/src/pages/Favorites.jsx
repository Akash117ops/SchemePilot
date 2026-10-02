import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  Loader2,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  getFavorites,
  removeFavorite,
} from "../services/api";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getFavorites();

        setFavorites(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(
          err.message ||
            "Unable to load your saved schemes."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleRemove = async (schemeId) => {
    try {
      setRemovingId(schemeId);

      await removeFavorite(schemeId);

      setFavorites((current) =>
        current.filter(
          (scheme) => scheme.id !== schemeId
        )
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to remove this favorite."
      );
    } finally {
      setRemovingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="favorites-page">
        <div className="favorites-loading">
          <Loader2
            size={34}
            className="favorites-spinner"
          />
          <p>Loading your saved schemes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <header className="favorites-header">
        <Link
          to="/dashboard"
          className="favorites-back-link"
        >
          ← Back to Dashboard
        </Link>

        <div className="favorites-title-row">
          <div className="favorites-title-icon">
            <Heart size={25} />
          </div>

          <div>
            <h1>Saved Schemes</h1>
            <p>
              Keep track of government schemes you want
              to explore later.
            </p>
          </div>
        </div>
      </header>

      <main className="favorites-container">
        {error && (
          <div className="favorites-error">
            {error}
          </div>
        )}

        {favorites.length === 0 ? (
          <div className="favorites-empty">
            <div className="favorites-empty-icon">
              <Heart size={34} />
            </div>

            <h2>No saved schemes yet</h2>

            <p>
              Browse government schemes and save the ones
              you want to come back to.
            </p>

            <Link
              to="/schemes"
              className="favorites-browse-button"
            >
              Browse Schemes
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <>
            <div className="favorites-summary">
              <div>
                <h2>Your saved schemes</h2>
                <p>
                  {favorites.length} scheme
                  {favorites.length !== 1 ? "s" : ""} saved
                </p>
              </div>

              <Link
                to="/schemes"
                className="favorites-explore-link"
              >
                Explore more
                <ArrowRight size={17} />
              </Link>
            </div>

            <section className="favorites-grid">
              {favorites.map((scheme, index) => (
                <motion.article
                  key={scheme.id}
                  className="favorite-card"
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
                    delay: index * 0.05,
                  }}
                >
                  <div className="favorite-card-top">
                    <span className="favorite-category">
                      {scheme.category ||
                        "Government Scheme"}
                    </span>

                    <button
                      className="favorite-remove-button"
                      onClick={() =>
                        handleRemove(scheme.id)
                      }
                      disabled={removingId === scheme.id}
                      title="Remove from favorites"
                    >
                      {removingId === scheme.id ? (
                        <Loader2
                          size={18}
                          className="favorites-spinner"
                        />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </button>
                  </div>

                  <h3>{scheme.name}</h3>

                  <p className="favorite-description">
                    {scheme.description}
                  </p>

                  <div className="favorite-benefit">
                    <span>Benefits</span>
                    <p>{scheme.benefits}</p>
                  </div>

                  <Link
                    to={`/schemes/${scheme.id}`}
                    className="favorite-details-link"
                  >
                    View scheme details
                    <ArrowRight size={17} />
                  </Link>
                </motion.article>
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Favorites;
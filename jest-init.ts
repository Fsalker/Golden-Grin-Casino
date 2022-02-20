import "@testing-library/jest-dom/extend-expect";
import "cross-fetch/polyfill";

process.env.JWT_SECRET = "not-so-secret";

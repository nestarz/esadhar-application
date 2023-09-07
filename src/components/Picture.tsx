import type { FunctionComponent } from "preact";

type Params = Record<string, unknown>;

const applySearchParams = (
  pathnameOrUrl: URL | string,
  params: URLSearchParams | Params | ((p: Params) => Params) = (params) =>
    params
): string => {
  const url = new URL(pathnameOrUrl, "http://localhost");
  const nextParams = Object.entries(
    typeof params === "function"
      ? params(Object.fromEntries(url.searchParams))
      : params instanceof URLSearchParams
      ? Object.fromEntries(params)
      : params ?? {}
  );
  const urlWithoutQueryParams = new URL(`${url.origin}${url.pathname}`);
  nextParams.forEach(([key, value]) =>
    typeof value === "undefined"
      ? null
      : urlWithoutQueryParams.searchParams.set(
          key,
          typeof value === "object" ? JSON.stringify(value) : value?.toString()
        )
  );
  return pathnameOrUrl.toString().startsWith("http")
    ? urlWithoutQueryParams.href
    : urlWithoutQueryParams.pathname.concat(urlWithoutQueryParams.search);
};
export const sharp = (url: URL | string | null, options: unknown) =>
  url
    ? applySearchParams("/api/transformer", {
        resize: 500,
        toFormat: ["webp", { quality: 90 }],
        ...(options ?? {}),
        url: encodeURIComponent(url instanceof URL ? url.href : url),
      })
    : undefined;

interface ImageProps {
  src: string;
  alt?: string;
  maxWidth?: number;
  coefficient?: number;
}

const Picture: FunctionComponent<
  HTMLAttributes<HTMLImageElement> & ImageProps
> = ({ src, maxWidth, coefficient = 1, alt = "", ...props }) => {
  const sizes = [320, 480, 768, 1024, 1280, 1920]
    .map((d) => d * coefficient)
    .filter((v) => !maxWidth || v < maxWidth * coefficient);
  const mediaQueries = {
    [320 * coefficient]: `(max-width: ${320}px)`,
    [480 * coefficient]: `(max-width: ${480}px)`,
    [768 * coefficient]: `(max-width: ${768}px)`,
    [1024 * coefficient]: `(max-width: ${1024}px)`,
    [1280 * coefficient]: `(max-width: ${1280}px)`,
    [1920 * coefficient]: `(max-width: ${1920}px)`,
  };

  return (
    <picture className="contents">
      {!src.includes(".gif") &&
        sizes.map(
          (size) =>
            !!src && (
              <source
                className="hidden"
                key={size}
                srcSet={sharp(src, { resize: size })}
                media={mediaQueries[size as keyof typeof mediaQueries]}
              />
            )
        )}
      <img
        src={
          src.includes(".gif")
            ? src
            : sharp(src, { resize: sizes[sizes.length - 1] ?? maxWidth })
        }
        alt={alt}
        {...props}
      />
    </picture>
  );
};

export default Picture;

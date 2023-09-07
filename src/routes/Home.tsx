import type { RouteConfig, MiddlewareHandlerContext } from "$fresh/server.ts";
import type { GQLiteClientContext } from "gqlite";
import gql from "noop-tag";
import { Query } from "@/types.d.ts";
import Picture from "@/src/components/Picture.tsx";
import createVNode from "outils/createVNode.ts";
import { Fragment } from "islet/preact/jsx-runtime";
import clsx from "clsx";
import css from "noop-tag";

export const config: RouteConfig = {
  routeOverride: "/",
};

const indexMap = { 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V", 6: "VI" };

export default async (
  _req: Request,
  ctx: MiddlewareHandlerContext<GQLiteClientContext>
) => {
  const { data } = await ctx.state.graphQLClient<Query>({
    query: gql`
      query {
        about {
          title
          content
          images_json
        }
        posts {
          title
          content
          images_json
        }
      }
    `,
  });

  return (
    <html>
      <head>
        <title></title>
        <style
          dangerouslySetInnerHTML={{
            __html: css`
              @page {
                size: auto;
                margin: 2cm 0.5cm;

                @page :footer {
                  display: none;
                }

                @page :header {
                  display: none;
                }
              }

              @page :footer {
                display: none;
              }

              @page :header {
                display: none;
              }

              @media print {
                .web {
                  display: inline !important;
                }
                .print {
                  display: none !important;
                }
              }
            `,
          }}
        />
      </head>
      <body className="">
        <div className="flex flex-col font-scto gap-4 bg-white">
          <div className="px-16 p-4 flex flex-col gap-24 bg-white w-fit max-w-6xl flex">
            <div className="flex gap-4 justify-between">
              {data?.about?.map((about) => (
                <Fragment>
                  <div className="uppercase">
                    <div className="leading-none text-xs">Candidature</div>
                    <a href="https://bureaudouble.com" target="_blank">
                      {about.images_json?.[0]?.url && (
                        <Picture
                          className="-ml-[5px] max-w-[15rem] w-full"
                          src={about.images_json?.[0]?.url}
                          maxWidth={400}
                        />
                      )}
                    </a>
                  </div>
                  <div className="font-medium uppercase relative text-right">
                    <div
                      dangerouslySetInnerHTML={{ __html: about?.content }}
                      className="text-xs prose prose-xs ml-auto"
                    />
                    <div className="text-xs prose prose-xs ml-auto">
                      08 Septembre 2023
                    </div>
                    <a
                      href="https://esadhar.bureaudouble.com"
                      className="hidden web text-xs underline block hover:(no-underline font-bold)"
                    >
                      Version en ligne
                    </a>
                    <a
                      href="https://esadhar.storage.bureaudouble.com/application/esadhar_08092023.pdf"
                      className="print text-xs underline block hover:(no-underline font-bold)"
                    >
                      Version pdf
                    </a>
                  </div>
                </Fragment>
              ))}
            </div>
            <div className="flex flex-col gap-8 backdrop-blur relative">
              {data?.posts?.map((post, index, arr) => {
                const prevIndex = arr
                  .slice(0, index)
                  .reduce((p, v) => p + (v.images_json?.length ?? 0), 0);
                let imageIndex = prevIndex;
                const max = index > 0 && index !== arr.length - 2;
                return (
                  <div className="break-after-auto break-inside-avoid grid grid-cols-[1fr_max-content_2.5fr] gap-8 relative before:(pointer-events-none aspect-square bg-yellow-400/[0.15] bg-clip-padding content-[' '] blur-[236px] absolute top-[90vh] w-full z-0 border-[12px] border-solid border-transparent)">
                    {index > 0 && index !== arr.length - 2 && (
                      <div className="text-sm whitespace-nowrap font-bold">
                        {post?.title}
                      </div>
                    )}
                    <div
                      className={clsx(
                        !max ? "col-span-full" : "",
                        "rounded -mt-4 p-4 [&_p+div]:-mt-2 prose-p:text-justify prose-strong:font-medium [&_div+p]:mt-0 prose prose-black prose-h3:(font-normal uppercase text-xs)"
                      )}
                    >
                      {createVNode({
                        html: post?.content,
                        h: (Type, args, children) => {
                          if (Type === "s") imageIndex += 1;
                          return (
                            <Fragment>
                              <Type
                                {...args}
                                id={`text${imageIndex}`}
                                className={clsx(args.className, {
                                  "no-underline": Type === "s",
                                  "hover:(no-underline font-bold)":
                                    Type === "a",
                                })}
                              >
                                {children}
                              </Type>
                              {Type === "s" && (
                                <a
                                  href={`#fig${imageIndex}`}
                                  alt=""
                                  className="text-xs no-underline font-bold -translate-y-2 inline-block hover:(underline)"
                                >
                                  fig. {imageIndex}
                                </a>
                              )}
                            </Fragment>
                          );
                        },
                      })}
                    </div>
                    <div className="flex flex-col gap-8 min-w-[20vw]">
                      {post.images_json?.map((d, index) => (
                        <a
                          className="flex flex-col gap-1 hover:underline"
                          href={`#text${index + prevIndex}`}
                          id={`fig${index + prevIndex}`}
                        >
                          <Picture
                            src={d.url}
                            alt=""
                            className="rounded m-0 mix-blend-multiply"
                            maxWidth={480}
                          />
                          <span className="font-bold text-xs w-full py-1">
                            fig. {prevIndex + index + 1}.
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <footer className="prose prose-black max-w-4xl">
              Mise en page réalisée via des technologies web open-source, code
              hébergé sur{" "}
              <a
                href="https://github.com/nestarz/esadhar-application"
                className="underline font-bold whitespace-pre"
              >
                github.com/nestarz/esadhar-application
              </a>
              . <br />
              La{" "}
              <a
                href="https://esadhar.storage.bureaudouble.com/application/esadhar_08092023.pdf"
                className="underline hover:(no-underline font-bold)"
              >
                version PDF
              </a>{" "}
              a été généré à partir de la{" "}
              <a
                href="https://esadhar.bureaudouble.com"
                className="underline hover:(no-underline font-bold)"
              >
                version en ligne
              </a>{" "}
              via la technologie CSS @print .
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
};

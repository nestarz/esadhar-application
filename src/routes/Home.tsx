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
                margin: 1cm;

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
                    {about.images_json?.[0]?.url && (
                      <Picture
                      className="-ml-[0.27rem]"
                        src={about.images_json?.[0]?.url}
                        maxWidth={400}
                      />
                    )}
                  </div>
                  <div className="font-medium uppercase relative text-right">
                    <div
                      dangerouslySetInnerHTML={{ __html: about?.content }}
                      className="text-xs prose prose-xs ml-auto"
                    />
                    <div className="text-xs prose prose-xs ml-auto">
                      08 Septembre 2023
                    </div>
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
                return (
                  <div className="break-after-auto break-inside-avoid flex gap-8 relative before:(pointer-events-none aspect-square bg-yellow-400/[0.15] bg-clip-padding content-[' '] blur-[236px] absolute top-[90vh] w-full z-0 border-[12px] border-solid border-transparent)">
                    {index > 0 && index !== arr.length - 2 && (
                      <div className="text-sm whitespace-nowrap font-bold col-span-full">
                        {post?.title}
                      </div>
                    )}
                    <div className="rounded -mt-4 p-4 [&_p+div]:-mt-2 prose-p:text-justify prose-strong:font-medium [&_div+p]:mt-0 col-span-3 prose prose-black prose-h3:(font-normal uppercase text-xs)">
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
                    <div className="flex flex-col gap-8">
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
            <footer>
              Mise en page réalisée via des technologies web open-source, code
              hébergé sur{" "}
              <a
                href="https://github.com/nestarz/esadhar-application"
                className="underline font-bold"
              >
                github.com/nestarz/esadhar-application
              </a>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
};

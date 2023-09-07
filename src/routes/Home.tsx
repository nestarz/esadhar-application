import type { RouteConfig, MiddlewareHandlerContext } from "$fresh/server.ts";
import type { GQLiteClientContext } from "gqlite";
import gql from "noop-tag";
import { Query } from "@/types.d.ts";
import Picture from "@/src/components/Picture.tsx";
import createVNode from "outils/createVNode.ts";
import { Fragment } from "islet/preact/jsx-runtime";
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
          <div className="px-16 p-4 flex flex-col gap-12 bg-white w-fit max-w-6xl">
            {data?.about?.map((about) => (
              <div className="font-medium text-8xl uppercase relative text-right">
                <div className="text-xs prose prose-xs ml-auto">
                  08 Septembre 2023
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: about?.content }}
                  className="text-xs prose prose-xs ml-auto"
                />
                <div>{about?.title}</div>
              </div>
            ))}
            <div className="flex flex-col gap-8 backdrop-blur relative">
              {data?.posts?.map((post, index) => {
                let imageIndex = 0;
                return (
                  <div className="break-after-auto break-inside-avoid grid grid-cols-4 gap-6 relative before:(aspect-square bg-blue-500/[0.05] bg-clip-padding content-[' '] blur-[236px] absolute top-[90vh] w-full z-0 border-[12px] border-solid border-transparent)">
                    <div className="uppercase font-bold col-span-full py-2">
                      {indexMap[index + 1]}. {post?.title}
                      <span className="w-[200vw] absolute border-b-1 border-blue-400/25 -left-[10vw] -right-[10vw] mt-4 -z-1"></span>
                    </div>
                    <div className="[&_p+div]:-mt-2 prose-strong:font-medium [&_div+p]:mt-0 [&_s]:(text-xs no-underline font-bold -translate-y-2 inline-block) col-span-3 backdrop-opacity-10 backdrop-hue-rotate-30 bg-white/30 prose prose-lg max-w-none prose-black prose-h3:(font-normal uppercase text-xs) columns-2">
                      {createVNode({
                        html: post?.content,
                        h: (Type, args, children) => {
                          if (Type === "s") imageIndex += 1;
                          return (
                            <Fragment>
                              <Type {...args}>{children}</Type>
                              {Type === "s" ? (
                                <span className="w-[200vw] absolute border-b-1 border-blue-400/25 -left-[10vw] -right-[10vw] mt-3 -z-1"></span>
                              ) : (
                                ""
                              )}
                              {Type === "s"
                                ? post?.images_json
                                    ?.slice(imageIndex, imageIndex + 1)
                                    .map((d) => (
                                      <span className="flex flex-col gap-1 float-right absolute ml-4 w-[40vw] left-full inline -translate-y-full mt-5">
                                        <Picture
                                          src={d.url}
                                          alt=""
                                          className="rounded m-0"
                                          maxWidth={480}
                                        />
                                        <span className="font-bold text-xs w-full py-1">
                                          fig. {imageIndex}.
                                        </span>
                                      </span>
                                    ))
                                : ""}
                            </Fragment>
                          );
                        },
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

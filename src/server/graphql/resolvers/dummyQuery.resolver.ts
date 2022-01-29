import { Query, Resolver } from "type-graphql";

/**
 * prevent apollo crash
 */
@Resolver()
export class DummyQueryResolver {
  @Query(() => Boolean)
  async dummyQuery() {
    throw new Error("CRASH");
  }
}

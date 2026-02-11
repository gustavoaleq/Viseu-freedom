
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Trt
 * 
 */
export type Trt = $Result.DefaultSelection<Prisma.$TrtPayload>
/**
 * Model Preposto
 * 
 */
export type Preposto = $Result.DefaultSelection<Prisma.$PrepostoPayload>
/**
 * Model Parceiro
 * 
 */
export type Parceiro = $Result.DefaultSelection<Prisma.$ParceiroPayload>
/**
 * Model ContatoParceiro
 * 
 */
export type ContatoParceiro = $Result.DefaultSelection<Prisma.$ContatoParceiroPayload>
/**
 * Model Importacao
 * 
 */
export type Importacao = $Result.DefaultSelection<Prisma.$ImportacaoPayload>
/**
 * Model Audiencia
 * 
 */
export type Audiencia = $Result.DefaultSelection<Prisma.$AudienciaPayload>
/**
 * Model Mensagem
 * 
 */
export type Mensagem = $Result.DefaultSelection<Prisma.$MensagemPayload>
/**
 * Model RelatorioAudiencia
 * 
 */
export type RelatorioAudiencia = $Result.DefaultSelection<Prisma.$RelatorioAudienciaPayload>
/**
 * Model HistoricoStatus
 * 
 */
export type HistoricoStatus = $Result.DefaultSelection<Prisma.$HistoricoStatusPayload>
/**
 * Model Substituicao
 * 
 */
export type Substituicao = $Result.DefaultSelection<Prisma.$SubstituicaoPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const StatusAudiencia: {
  IMPORTADA: 'IMPORTADA',
  AGENDADA: 'AGENDADA',
  A_CONFIRMAR: 'A_CONFIRMAR',
  CONFIRMADA: 'CONFIRMADA',
  NAO_POSSO: 'NAO_POSSO',
  SEM_RESPOSTA: 'SEM_RESPOSTA',
  SUBSTITUICAO_NECESSARIA: 'SUBSTITUICAO_NECESSARIA',
  EM_ANDAMENTO: 'EM_ANDAMENTO',
  CHECK_IN_PENDENTE: 'CHECK_IN_PENDENTE',
  RELATORIO_PENDENTE: 'RELATORIO_PENDENTE',
  CONCLUIDA: 'CONCLUIDA',
  CANCELADA: 'CANCELADA'
};

export type StatusAudiencia = (typeof StatusAudiencia)[keyof typeof StatusAudiencia]


export const Modalidade: {
  PRESENCIAL: 'PRESENCIAL',
  ONLINE: 'ONLINE'
};

export type Modalidade = (typeof Modalidade)[keyof typeof Modalidade]


export const TipoMensagem: {
  CONFIRMACAO_D1: 'CONFIRMACAO_D1',
  REITERACAO_H1H30: 'REITERACAO_H1H30',
  CHECK_IN: 'CHECK_IN',
  RELATORIO_POS: 'RELATORIO_POS',
  SUBSTITUICAO_AVISO: 'SUBSTITUICAO_AVISO',
  ESCALONAMENTO: 'ESCALONAMENTO'
};

export type TipoMensagem = (typeof TipoMensagem)[keyof typeof TipoMensagem]


export const DirecaoMensagem: {
  ENVIADA: 'ENVIADA',
  RECEBIDA: 'RECEBIDA'
};

export type DirecaoMensagem = (typeof DirecaoMensagem)[keyof typeof DirecaoMensagem]


export const StatusEnvioMensagem: {
  PENDENTE: 'PENDENTE',
  ENVIADA: 'ENVIADA',
  ENTREGUE: 'ENTREGUE',
  LIDA: 'LIDA',
  FALHA: 'FALHA'
};

export type StatusEnvioMensagem = (typeof StatusEnvioMensagem)[keyof typeof StatusEnvioMensagem]


export const StatusImportacao: {
  PROCESSANDO: 'PROCESSANDO',
  CONCLUIDA: 'CONCLUIDA',
  ERRO: 'ERRO'
};

export type StatusImportacao = (typeof StatusImportacao)[keyof typeof StatusImportacao]


export const OcorrenciaAudiencia: {
  SIM: 'SIM',
  NAO: 'NAO',
  REMARCADA: 'REMARCADA'
};

export type OcorrenciaAudiencia = (typeof OcorrenciaAudiencia)[keyof typeof OcorrenciaAudiencia]


export const ResultadoAudiencia: {
  ACORDO: 'ACORDO',
  SEM_ACORDO: 'SEM_ACORDO',
  AUSENCIA: 'AUSENCIA',
  REDESIGNADA: 'REDESIGNADA'
};

export type ResultadoAudiencia = (typeof ResultadoAudiencia)[keyof typeof ResultadoAudiencia]


export const StatusSubstituicao: {
  ABERTA: 'ABERTA',
  RESOLVIDA: 'RESOLVIDA',
  CANCELADA: 'CANCELADA'
};

export type StatusSubstituicao = (typeof StatusSubstituicao)[keyof typeof StatusSubstituicao]


export const RoleUsuario: {
  ADMIN: 'ADMIN',
  OPERADOR: 'OPERADOR',
  GESTOR: 'GESTOR'
};

export type RoleUsuario = (typeof RoleUsuario)[keyof typeof RoleUsuario]

}

export type StatusAudiencia = $Enums.StatusAudiencia

export const StatusAudiencia: typeof $Enums.StatusAudiencia

export type Modalidade = $Enums.Modalidade

export const Modalidade: typeof $Enums.Modalidade

export type TipoMensagem = $Enums.TipoMensagem

export const TipoMensagem: typeof $Enums.TipoMensagem

export type DirecaoMensagem = $Enums.DirecaoMensagem

export const DirecaoMensagem: typeof $Enums.DirecaoMensagem

export type StatusEnvioMensagem = $Enums.StatusEnvioMensagem

export const StatusEnvioMensagem: typeof $Enums.StatusEnvioMensagem

export type StatusImportacao = $Enums.StatusImportacao

export const StatusImportacao: typeof $Enums.StatusImportacao

export type OcorrenciaAudiencia = $Enums.OcorrenciaAudiencia

export const OcorrenciaAudiencia: typeof $Enums.OcorrenciaAudiencia

export type ResultadoAudiencia = $Enums.ResultadoAudiencia

export const ResultadoAudiencia: typeof $Enums.ResultadoAudiencia

export type StatusSubstituicao = $Enums.StatusSubstituicao

export const StatusSubstituicao: typeof $Enums.StatusSubstituicao

export type RoleUsuario = $Enums.RoleUsuario

export const RoleUsuario: typeof $Enums.RoleUsuario

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Usuarios
 * const usuarios = await prisma.usuario.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuario.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trt`: Exposes CRUD operations for the **Trt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trts
    * const trts = await prisma.trt.findMany()
    * ```
    */
  get trt(): Prisma.TrtDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.preposto`: Exposes CRUD operations for the **Preposto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prepostos
    * const prepostos = await prisma.preposto.findMany()
    * ```
    */
  get preposto(): Prisma.PrepostoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.parceiro`: Exposes CRUD operations for the **Parceiro** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Parceiros
    * const parceiros = await prisma.parceiro.findMany()
    * ```
    */
  get parceiro(): Prisma.ParceiroDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contatoParceiro`: Exposes CRUD operations for the **ContatoParceiro** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContatoParceiros
    * const contatoParceiros = await prisma.contatoParceiro.findMany()
    * ```
    */
  get contatoParceiro(): Prisma.ContatoParceiroDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.importacao`: Exposes CRUD operations for the **Importacao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Importacaos
    * const importacaos = await prisma.importacao.findMany()
    * ```
    */
  get importacao(): Prisma.ImportacaoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.audiencia`: Exposes CRUD operations for the **Audiencia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Audiencias
    * const audiencias = await prisma.audiencia.findMany()
    * ```
    */
  get audiencia(): Prisma.AudienciaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mensagem`: Exposes CRUD operations for the **Mensagem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mensagems
    * const mensagems = await prisma.mensagem.findMany()
    * ```
    */
  get mensagem(): Prisma.MensagemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.relatorioAudiencia`: Exposes CRUD operations for the **RelatorioAudiencia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RelatorioAudiencias
    * const relatorioAudiencias = await prisma.relatorioAudiencia.findMany()
    * ```
    */
  get relatorioAudiencia(): Prisma.RelatorioAudienciaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.historicoStatus`: Exposes CRUD operations for the **HistoricoStatus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HistoricoStatuses
    * const historicoStatuses = await prisma.historicoStatus.findMany()
    * ```
    */
  get historicoStatus(): Prisma.HistoricoStatusDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.substituicao`: Exposes CRUD operations for the **Substituicao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Substituicaos
    * const substituicaos = await prisma.substituicao.findMany()
    * ```
    */
  get substituicao(): Prisma.SubstituicaoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Usuario: 'Usuario',
    Trt: 'Trt',
    Preposto: 'Preposto',
    Parceiro: 'Parceiro',
    ContatoParceiro: 'ContatoParceiro',
    Importacao: 'Importacao',
    Audiencia: 'Audiencia',
    Mensagem: 'Mensagem',
    RelatorioAudiencia: 'RelatorioAudiencia',
    HistoricoStatus: 'HistoricoStatus',
    Substituicao: 'Substituicao'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "usuario" | "trt" | "preposto" | "parceiro" | "contatoParceiro" | "importacao" | "audiencia" | "mensagem" | "relatorioAudiencia" | "historicoStatus" | "substituicao"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Trt: {
        payload: Prisma.$TrtPayload<ExtArgs>
        fields: Prisma.TrtFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrtFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrtPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrtFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrtPayload>
          }
          findFirst: {
            args: Prisma.TrtFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrtPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrtFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrtPayload>
          }
          findMany: {
            args: Prisma.TrtFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrtPayload>[]
          }
          create: {
            args: Prisma.TrtCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrtPayload>
          }
          createMany: {
            args: Prisma.TrtCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrtCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrtPayload>[]
          }
          delete: {
            args: Prisma.TrtDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrtPayload>
          }
          update: {
            args: Prisma.TrtUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrtPayload>
          }
          deleteMany: {
            args: Prisma.TrtDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrtUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrtUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrtPayload>[]
          }
          upsert: {
            args: Prisma.TrtUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrtPayload>
          }
          aggregate: {
            args: Prisma.TrtAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrt>
          }
          groupBy: {
            args: Prisma.TrtGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrtGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrtCountArgs<ExtArgs>
            result: $Utils.Optional<TrtCountAggregateOutputType> | number
          }
        }
      }
      Preposto: {
        payload: Prisma.$PrepostoPayload<ExtArgs>
        fields: Prisma.PrepostoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PrepostoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrepostoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PrepostoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrepostoPayload>
          }
          findFirst: {
            args: Prisma.PrepostoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrepostoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PrepostoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrepostoPayload>
          }
          findMany: {
            args: Prisma.PrepostoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrepostoPayload>[]
          }
          create: {
            args: Prisma.PrepostoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrepostoPayload>
          }
          createMany: {
            args: Prisma.PrepostoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PrepostoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrepostoPayload>[]
          }
          delete: {
            args: Prisma.PrepostoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrepostoPayload>
          }
          update: {
            args: Prisma.PrepostoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrepostoPayload>
          }
          deleteMany: {
            args: Prisma.PrepostoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PrepostoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PrepostoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrepostoPayload>[]
          }
          upsert: {
            args: Prisma.PrepostoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrepostoPayload>
          }
          aggregate: {
            args: Prisma.PrepostoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePreposto>
          }
          groupBy: {
            args: Prisma.PrepostoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrepostoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PrepostoCountArgs<ExtArgs>
            result: $Utils.Optional<PrepostoCountAggregateOutputType> | number
          }
        }
      }
      Parceiro: {
        payload: Prisma.$ParceiroPayload<ExtArgs>
        fields: Prisma.ParceiroFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParceiroFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParceiroPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParceiroFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParceiroPayload>
          }
          findFirst: {
            args: Prisma.ParceiroFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParceiroPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParceiroFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParceiroPayload>
          }
          findMany: {
            args: Prisma.ParceiroFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParceiroPayload>[]
          }
          create: {
            args: Prisma.ParceiroCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParceiroPayload>
          }
          createMany: {
            args: Prisma.ParceiroCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ParceiroCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParceiroPayload>[]
          }
          delete: {
            args: Prisma.ParceiroDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParceiroPayload>
          }
          update: {
            args: Prisma.ParceiroUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParceiroPayload>
          }
          deleteMany: {
            args: Prisma.ParceiroDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParceiroUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ParceiroUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParceiroPayload>[]
          }
          upsert: {
            args: Prisma.ParceiroUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParceiroPayload>
          }
          aggregate: {
            args: Prisma.ParceiroAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParceiro>
          }
          groupBy: {
            args: Prisma.ParceiroGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParceiroGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParceiroCountArgs<ExtArgs>
            result: $Utils.Optional<ParceiroCountAggregateOutputType> | number
          }
        }
      }
      ContatoParceiro: {
        payload: Prisma.$ContatoParceiroPayload<ExtArgs>
        fields: Prisma.ContatoParceiroFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContatoParceiroFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoParceiroPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContatoParceiroFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoParceiroPayload>
          }
          findFirst: {
            args: Prisma.ContatoParceiroFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoParceiroPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContatoParceiroFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoParceiroPayload>
          }
          findMany: {
            args: Prisma.ContatoParceiroFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoParceiroPayload>[]
          }
          create: {
            args: Prisma.ContatoParceiroCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoParceiroPayload>
          }
          createMany: {
            args: Prisma.ContatoParceiroCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContatoParceiroCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoParceiroPayload>[]
          }
          delete: {
            args: Prisma.ContatoParceiroDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoParceiroPayload>
          }
          update: {
            args: Prisma.ContatoParceiroUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoParceiroPayload>
          }
          deleteMany: {
            args: Prisma.ContatoParceiroDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContatoParceiroUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContatoParceiroUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoParceiroPayload>[]
          }
          upsert: {
            args: Prisma.ContatoParceiroUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoParceiroPayload>
          }
          aggregate: {
            args: Prisma.ContatoParceiroAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContatoParceiro>
          }
          groupBy: {
            args: Prisma.ContatoParceiroGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContatoParceiroGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContatoParceiroCountArgs<ExtArgs>
            result: $Utils.Optional<ContatoParceiroCountAggregateOutputType> | number
          }
        }
      }
      Importacao: {
        payload: Prisma.$ImportacaoPayload<ExtArgs>
        fields: Prisma.ImportacaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ImportacaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportacaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ImportacaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportacaoPayload>
          }
          findFirst: {
            args: Prisma.ImportacaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportacaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ImportacaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportacaoPayload>
          }
          findMany: {
            args: Prisma.ImportacaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportacaoPayload>[]
          }
          create: {
            args: Prisma.ImportacaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportacaoPayload>
          }
          createMany: {
            args: Prisma.ImportacaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ImportacaoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportacaoPayload>[]
          }
          delete: {
            args: Prisma.ImportacaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportacaoPayload>
          }
          update: {
            args: Prisma.ImportacaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportacaoPayload>
          }
          deleteMany: {
            args: Prisma.ImportacaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ImportacaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ImportacaoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportacaoPayload>[]
          }
          upsert: {
            args: Prisma.ImportacaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportacaoPayload>
          }
          aggregate: {
            args: Prisma.ImportacaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImportacao>
          }
          groupBy: {
            args: Prisma.ImportacaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImportacaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ImportacaoCountArgs<ExtArgs>
            result: $Utils.Optional<ImportacaoCountAggregateOutputType> | number
          }
        }
      }
      Audiencia: {
        payload: Prisma.$AudienciaPayload<ExtArgs>
        fields: Prisma.AudienciaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AudienciaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudienciaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AudienciaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudienciaPayload>
          }
          findFirst: {
            args: Prisma.AudienciaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudienciaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AudienciaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudienciaPayload>
          }
          findMany: {
            args: Prisma.AudienciaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudienciaPayload>[]
          }
          create: {
            args: Prisma.AudienciaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudienciaPayload>
          }
          createMany: {
            args: Prisma.AudienciaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AudienciaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudienciaPayload>[]
          }
          delete: {
            args: Prisma.AudienciaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudienciaPayload>
          }
          update: {
            args: Prisma.AudienciaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudienciaPayload>
          }
          deleteMany: {
            args: Prisma.AudienciaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AudienciaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AudienciaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudienciaPayload>[]
          }
          upsert: {
            args: Prisma.AudienciaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudienciaPayload>
          }
          aggregate: {
            args: Prisma.AudienciaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAudiencia>
          }
          groupBy: {
            args: Prisma.AudienciaGroupByArgs<ExtArgs>
            result: $Utils.Optional<AudienciaGroupByOutputType>[]
          }
          count: {
            args: Prisma.AudienciaCountArgs<ExtArgs>
            result: $Utils.Optional<AudienciaCountAggregateOutputType> | number
          }
        }
      }
      Mensagem: {
        payload: Prisma.$MensagemPayload<ExtArgs>
        fields: Prisma.MensagemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MensagemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MensagemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload>
          }
          findFirst: {
            args: Prisma.MensagemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MensagemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload>
          }
          findMany: {
            args: Prisma.MensagemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload>[]
          }
          create: {
            args: Prisma.MensagemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload>
          }
          createMany: {
            args: Prisma.MensagemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MensagemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload>[]
          }
          delete: {
            args: Prisma.MensagemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload>
          }
          update: {
            args: Prisma.MensagemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload>
          }
          deleteMany: {
            args: Prisma.MensagemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MensagemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MensagemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload>[]
          }
          upsert: {
            args: Prisma.MensagemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload>
          }
          aggregate: {
            args: Prisma.MensagemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMensagem>
          }
          groupBy: {
            args: Prisma.MensagemGroupByArgs<ExtArgs>
            result: $Utils.Optional<MensagemGroupByOutputType>[]
          }
          count: {
            args: Prisma.MensagemCountArgs<ExtArgs>
            result: $Utils.Optional<MensagemCountAggregateOutputType> | number
          }
        }
      }
      RelatorioAudiencia: {
        payload: Prisma.$RelatorioAudienciaPayload<ExtArgs>
        fields: Prisma.RelatorioAudienciaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RelatorioAudienciaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioAudienciaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RelatorioAudienciaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioAudienciaPayload>
          }
          findFirst: {
            args: Prisma.RelatorioAudienciaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioAudienciaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RelatorioAudienciaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioAudienciaPayload>
          }
          findMany: {
            args: Prisma.RelatorioAudienciaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioAudienciaPayload>[]
          }
          create: {
            args: Prisma.RelatorioAudienciaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioAudienciaPayload>
          }
          createMany: {
            args: Prisma.RelatorioAudienciaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RelatorioAudienciaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioAudienciaPayload>[]
          }
          delete: {
            args: Prisma.RelatorioAudienciaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioAudienciaPayload>
          }
          update: {
            args: Prisma.RelatorioAudienciaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioAudienciaPayload>
          }
          deleteMany: {
            args: Prisma.RelatorioAudienciaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RelatorioAudienciaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RelatorioAudienciaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioAudienciaPayload>[]
          }
          upsert: {
            args: Prisma.RelatorioAudienciaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioAudienciaPayload>
          }
          aggregate: {
            args: Prisma.RelatorioAudienciaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRelatorioAudiencia>
          }
          groupBy: {
            args: Prisma.RelatorioAudienciaGroupByArgs<ExtArgs>
            result: $Utils.Optional<RelatorioAudienciaGroupByOutputType>[]
          }
          count: {
            args: Prisma.RelatorioAudienciaCountArgs<ExtArgs>
            result: $Utils.Optional<RelatorioAudienciaCountAggregateOutputType> | number
          }
        }
      }
      HistoricoStatus: {
        payload: Prisma.$HistoricoStatusPayload<ExtArgs>
        fields: Prisma.HistoricoStatusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HistoricoStatusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoStatusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HistoricoStatusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoStatusPayload>
          }
          findFirst: {
            args: Prisma.HistoricoStatusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoStatusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HistoricoStatusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoStatusPayload>
          }
          findMany: {
            args: Prisma.HistoricoStatusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoStatusPayload>[]
          }
          create: {
            args: Prisma.HistoricoStatusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoStatusPayload>
          }
          createMany: {
            args: Prisma.HistoricoStatusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HistoricoStatusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoStatusPayload>[]
          }
          delete: {
            args: Prisma.HistoricoStatusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoStatusPayload>
          }
          update: {
            args: Prisma.HistoricoStatusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoStatusPayload>
          }
          deleteMany: {
            args: Prisma.HistoricoStatusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HistoricoStatusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HistoricoStatusUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoStatusPayload>[]
          }
          upsert: {
            args: Prisma.HistoricoStatusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoStatusPayload>
          }
          aggregate: {
            args: Prisma.HistoricoStatusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHistoricoStatus>
          }
          groupBy: {
            args: Prisma.HistoricoStatusGroupByArgs<ExtArgs>
            result: $Utils.Optional<HistoricoStatusGroupByOutputType>[]
          }
          count: {
            args: Prisma.HistoricoStatusCountArgs<ExtArgs>
            result: $Utils.Optional<HistoricoStatusCountAggregateOutputType> | number
          }
        }
      }
      Substituicao: {
        payload: Prisma.$SubstituicaoPayload<ExtArgs>
        fields: Prisma.SubstituicaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubstituicaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubstituicaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubstituicaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubstituicaoPayload>
          }
          findFirst: {
            args: Prisma.SubstituicaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubstituicaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubstituicaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubstituicaoPayload>
          }
          findMany: {
            args: Prisma.SubstituicaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubstituicaoPayload>[]
          }
          create: {
            args: Prisma.SubstituicaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubstituicaoPayload>
          }
          createMany: {
            args: Prisma.SubstituicaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubstituicaoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubstituicaoPayload>[]
          }
          delete: {
            args: Prisma.SubstituicaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubstituicaoPayload>
          }
          update: {
            args: Prisma.SubstituicaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubstituicaoPayload>
          }
          deleteMany: {
            args: Prisma.SubstituicaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubstituicaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubstituicaoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubstituicaoPayload>[]
          }
          upsert: {
            args: Prisma.SubstituicaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubstituicaoPayload>
          }
          aggregate: {
            args: Prisma.SubstituicaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubstituicao>
          }
          groupBy: {
            args: Prisma.SubstituicaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubstituicaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubstituicaoCountArgs<ExtArgs>
            result: $Utils.Optional<SubstituicaoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    usuario?: UsuarioOmit
    trt?: TrtOmit
    preposto?: PrepostoOmit
    parceiro?: ParceiroOmit
    contatoParceiro?: ContatoParceiroOmit
    importacao?: ImportacaoOmit
    audiencia?: AudienciaOmit
    mensagem?: MensagemOmit
    relatorioAudiencia?: RelatorioAudienciaOmit
    historicoStatus?: HistoricoStatusOmit
    substituicao?: SubstituicaoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TrtCountOutputType
   */

  export type TrtCountOutputType = {
    audiencias: number
  }

  export type TrtCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audiencias?: boolean | TrtCountOutputTypeCountAudienciasArgs
  }

  // Custom InputTypes
  /**
   * TrtCountOutputType without action
   */
  export type TrtCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrtCountOutputType
     */
    select?: TrtCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TrtCountOutputType without action
   */
  export type TrtCountOutputTypeCountAudienciasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AudienciaWhereInput
  }


  /**
   * Count Type PrepostoCountOutputType
   */

  export type PrepostoCountOutputType = {
    audiencias: number
    mensagens: number
    substituicoesAnterior: number
    substituicoesNovo: number
  }

  export type PrepostoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audiencias?: boolean | PrepostoCountOutputTypeCountAudienciasArgs
    mensagens?: boolean | PrepostoCountOutputTypeCountMensagensArgs
    substituicoesAnterior?: boolean | PrepostoCountOutputTypeCountSubstituicoesAnteriorArgs
    substituicoesNovo?: boolean | PrepostoCountOutputTypeCountSubstituicoesNovoArgs
  }

  // Custom InputTypes
  /**
   * PrepostoCountOutputType without action
   */
  export type PrepostoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrepostoCountOutputType
     */
    select?: PrepostoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PrepostoCountOutputType without action
   */
  export type PrepostoCountOutputTypeCountAudienciasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AudienciaWhereInput
  }

  /**
   * PrepostoCountOutputType without action
   */
  export type PrepostoCountOutputTypeCountMensagensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MensagemWhereInput
  }

  /**
   * PrepostoCountOutputType without action
   */
  export type PrepostoCountOutputTypeCountSubstituicoesAnteriorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubstituicaoWhereInput
  }

  /**
   * PrepostoCountOutputType without action
   */
  export type PrepostoCountOutputTypeCountSubstituicoesNovoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubstituicaoWhereInput
  }


  /**
   * Count Type ParceiroCountOutputType
   */

  export type ParceiroCountOutputType = {
    contatos: number
    audiencias: number
  }

  export type ParceiroCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contatos?: boolean | ParceiroCountOutputTypeCountContatosArgs
    audiencias?: boolean | ParceiroCountOutputTypeCountAudienciasArgs
  }

  // Custom InputTypes
  /**
   * ParceiroCountOutputType without action
   */
  export type ParceiroCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParceiroCountOutputType
     */
    select?: ParceiroCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ParceiroCountOutputType without action
   */
  export type ParceiroCountOutputTypeCountContatosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContatoParceiroWhereInput
  }

  /**
   * ParceiroCountOutputType without action
   */
  export type ParceiroCountOutputTypeCountAudienciasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AudienciaWhereInput
  }


  /**
   * Count Type ContatoParceiroCountOutputType
   */

  export type ContatoParceiroCountOutputType = {
    mensagens: number
  }

  export type ContatoParceiroCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mensagens?: boolean | ContatoParceiroCountOutputTypeCountMensagensArgs
  }

  // Custom InputTypes
  /**
   * ContatoParceiroCountOutputType without action
   */
  export type ContatoParceiroCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContatoParceiroCountOutputType
     */
    select?: ContatoParceiroCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContatoParceiroCountOutputType without action
   */
  export type ContatoParceiroCountOutputTypeCountMensagensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MensagemWhereInput
  }


  /**
   * Count Type ImportacaoCountOutputType
   */

  export type ImportacaoCountOutputType = {
    audiencias: number
  }

  export type ImportacaoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audiencias?: boolean | ImportacaoCountOutputTypeCountAudienciasArgs
  }

  // Custom InputTypes
  /**
   * ImportacaoCountOutputType without action
   */
  export type ImportacaoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportacaoCountOutputType
     */
    select?: ImportacaoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ImportacaoCountOutputType without action
   */
  export type ImportacaoCountOutputTypeCountAudienciasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AudienciaWhereInput
  }


  /**
   * Count Type AudienciaCountOutputType
   */

  export type AudienciaCountOutputType = {
    mensagens: number
    historicoStatus: number
    substituicoes: number
  }

  export type AudienciaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mensagens?: boolean | AudienciaCountOutputTypeCountMensagensArgs
    historicoStatus?: boolean | AudienciaCountOutputTypeCountHistoricoStatusArgs
    substituicoes?: boolean | AudienciaCountOutputTypeCountSubstituicoesArgs
  }

  // Custom InputTypes
  /**
   * AudienciaCountOutputType without action
   */
  export type AudienciaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudienciaCountOutputType
     */
    select?: AudienciaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AudienciaCountOutputType without action
   */
  export type AudienciaCountOutputTypeCountMensagensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MensagemWhereInput
  }

  /**
   * AudienciaCountOutputType without action
   */
  export type AudienciaCountOutputTypeCountHistoricoStatusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HistoricoStatusWhereInput
  }

  /**
   * AudienciaCountOutputType without action
   */
  export type AudienciaCountOutputTypeCountSubstituicoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubstituicaoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: string | null
    nome: string | null
    email: string | null
    senha: string | null
    role: $Enums.RoleUsuario | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    email: string | null
    senha: string | null
    role: $Enums.RoleUsuario | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    nome: number
    email: number
    senha: number
    role: number
    ativo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UsuarioMinAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    role?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    role?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    role?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: string
    nome: string
    email: string
    senha: string
    role: $Enums.RoleUsuario
    ativo: boolean
    createdAt: Date
    updatedAt: Date
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    role?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    role?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    role?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    role?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "email" | "senha" | "role" | "ativo" | "createdAt" | "updatedAt", ExtArgs["result"]["usuario"]>

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      email: string
      senha: string
      role: $Enums.RoleUsuario
      ativo: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'String'>
    readonly nome: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly senha: FieldRef<"Usuario", 'String'>
    readonly role: FieldRef<"Usuario", 'RoleUsuario'>
    readonly ativo: FieldRef<"Usuario", 'Boolean'>
    readonly createdAt: FieldRef<"Usuario", 'DateTime'>
    readonly updatedAt: FieldRef<"Usuario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario updateManyAndReturn
   */
  export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
  }


  /**
   * Model Trt
   */

  export type AggregateTrt = {
    _count: TrtCountAggregateOutputType | null
    _min: TrtMinAggregateOutputType | null
    _max: TrtMaxAggregateOutputType | null
  }

  export type TrtMinAggregateOutputType = {
    id: string | null
    numero: string | null
    nome: string | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrtMaxAggregateOutputType = {
    id: string | null
    numero: string | null
    nome: string | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrtCountAggregateOutputType = {
    id: number
    numero: number
    nome: number
    ativo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TrtMinAggregateInputType = {
    id?: true
    numero?: true
    nome?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrtMaxAggregateInputType = {
    id?: true
    numero?: true
    nome?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrtCountAggregateInputType = {
    id?: true
    numero?: true
    nome?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TrtAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trt to aggregate.
     */
    where?: TrtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trts to fetch.
     */
    orderBy?: TrtOrderByWithRelationInput | TrtOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trts
    **/
    _count?: true | TrtCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrtMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrtMaxAggregateInputType
  }

  export type GetTrtAggregateType<T extends TrtAggregateArgs> = {
        [P in keyof T & keyof AggregateTrt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrt[P]>
      : GetScalarType<T[P], AggregateTrt[P]>
  }




  export type TrtGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrtWhereInput
    orderBy?: TrtOrderByWithAggregationInput | TrtOrderByWithAggregationInput[]
    by: TrtScalarFieldEnum[] | TrtScalarFieldEnum
    having?: TrtScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrtCountAggregateInputType | true
    _min?: TrtMinAggregateInputType
    _max?: TrtMaxAggregateInputType
  }

  export type TrtGroupByOutputType = {
    id: string
    numero: string
    nome: string
    ativo: boolean
    createdAt: Date
    updatedAt: Date
    _count: TrtCountAggregateOutputType | null
    _min: TrtMinAggregateOutputType | null
    _max: TrtMaxAggregateOutputType | null
  }

  type GetTrtGroupByPayload<T extends TrtGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrtGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrtGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrtGroupByOutputType[P]>
            : GetScalarType<T[P], TrtGroupByOutputType[P]>
        }
      >
    >


  export type TrtSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    nome?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    audiencias?: boolean | Trt$audienciasArgs<ExtArgs>
    _count?: boolean | TrtCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trt"]>

  export type TrtSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    nome?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["trt"]>

  export type TrtSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    nome?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["trt"]>

  export type TrtSelectScalar = {
    id?: boolean
    numero?: boolean
    nome?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TrtOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "numero" | "nome" | "ativo" | "createdAt" | "updatedAt", ExtArgs["result"]["trt"]>
  export type TrtInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audiencias?: boolean | Trt$audienciasArgs<ExtArgs>
    _count?: boolean | TrtCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TrtIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TrtIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TrtPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Trt"
    objects: {
      audiencias: Prisma.$AudienciaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      numero: string
      nome: string
      ativo: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["trt"]>
    composites: {}
  }

  type TrtGetPayload<S extends boolean | null | undefined | TrtDefaultArgs> = $Result.GetResult<Prisma.$TrtPayload, S>

  type TrtCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrtFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrtCountAggregateInputType | true
    }

  export interface TrtDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Trt'], meta: { name: 'Trt' } }
    /**
     * Find zero or one Trt that matches the filter.
     * @param {TrtFindUniqueArgs} args - Arguments to find a Trt
     * @example
     * // Get one Trt
     * const trt = await prisma.trt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrtFindUniqueArgs>(args: SelectSubset<T, TrtFindUniqueArgs<ExtArgs>>): Prisma__TrtClient<$Result.GetResult<Prisma.$TrtPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Trt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrtFindUniqueOrThrowArgs} args - Arguments to find a Trt
     * @example
     * // Get one Trt
     * const trt = await prisma.trt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrtFindUniqueOrThrowArgs>(args: SelectSubset<T, TrtFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrtClient<$Result.GetResult<Prisma.$TrtPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrtFindFirstArgs} args - Arguments to find a Trt
     * @example
     * // Get one Trt
     * const trt = await prisma.trt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrtFindFirstArgs>(args?: SelectSubset<T, TrtFindFirstArgs<ExtArgs>>): Prisma__TrtClient<$Result.GetResult<Prisma.$TrtPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrtFindFirstOrThrowArgs} args - Arguments to find a Trt
     * @example
     * // Get one Trt
     * const trt = await prisma.trt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrtFindFirstOrThrowArgs>(args?: SelectSubset<T, TrtFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrtClient<$Result.GetResult<Prisma.$TrtPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrtFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trts
     * const trts = await prisma.trt.findMany()
     * 
     * // Get first 10 Trts
     * const trts = await prisma.trt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trtWithIdOnly = await prisma.trt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrtFindManyArgs>(args?: SelectSubset<T, TrtFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrtPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Trt.
     * @param {TrtCreateArgs} args - Arguments to create a Trt.
     * @example
     * // Create one Trt
     * const Trt = await prisma.trt.create({
     *   data: {
     *     // ... data to create a Trt
     *   }
     * })
     * 
     */
    create<T extends TrtCreateArgs>(args: SelectSubset<T, TrtCreateArgs<ExtArgs>>): Prisma__TrtClient<$Result.GetResult<Prisma.$TrtPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trts.
     * @param {TrtCreateManyArgs} args - Arguments to create many Trts.
     * @example
     * // Create many Trts
     * const trt = await prisma.trt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrtCreateManyArgs>(args?: SelectSubset<T, TrtCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trts and returns the data saved in the database.
     * @param {TrtCreateManyAndReturnArgs} args - Arguments to create many Trts.
     * @example
     * // Create many Trts
     * const trt = await prisma.trt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trts and only return the `id`
     * const trtWithIdOnly = await prisma.trt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrtCreateManyAndReturnArgs>(args?: SelectSubset<T, TrtCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrtPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Trt.
     * @param {TrtDeleteArgs} args - Arguments to delete one Trt.
     * @example
     * // Delete one Trt
     * const Trt = await prisma.trt.delete({
     *   where: {
     *     // ... filter to delete one Trt
     *   }
     * })
     * 
     */
    delete<T extends TrtDeleteArgs>(args: SelectSubset<T, TrtDeleteArgs<ExtArgs>>): Prisma__TrtClient<$Result.GetResult<Prisma.$TrtPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Trt.
     * @param {TrtUpdateArgs} args - Arguments to update one Trt.
     * @example
     * // Update one Trt
     * const trt = await prisma.trt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrtUpdateArgs>(args: SelectSubset<T, TrtUpdateArgs<ExtArgs>>): Prisma__TrtClient<$Result.GetResult<Prisma.$TrtPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trts.
     * @param {TrtDeleteManyArgs} args - Arguments to filter Trts to delete.
     * @example
     * // Delete a few Trts
     * const { count } = await prisma.trt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrtDeleteManyArgs>(args?: SelectSubset<T, TrtDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrtUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trts
     * const trt = await prisma.trt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrtUpdateManyArgs>(args: SelectSubset<T, TrtUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trts and returns the data updated in the database.
     * @param {TrtUpdateManyAndReturnArgs} args - Arguments to update many Trts.
     * @example
     * // Update many Trts
     * const trt = await prisma.trt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Trts and only return the `id`
     * const trtWithIdOnly = await prisma.trt.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrtUpdateManyAndReturnArgs>(args: SelectSubset<T, TrtUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrtPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Trt.
     * @param {TrtUpsertArgs} args - Arguments to update or create a Trt.
     * @example
     * // Update or create a Trt
     * const trt = await prisma.trt.upsert({
     *   create: {
     *     // ... data to create a Trt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trt we want to update
     *   }
     * })
     */
    upsert<T extends TrtUpsertArgs>(args: SelectSubset<T, TrtUpsertArgs<ExtArgs>>): Prisma__TrtClient<$Result.GetResult<Prisma.$TrtPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrtCountArgs} args - Arguments to filter Trts to count.
     * @example
     * // Count the number of Trts
     * const count = await prisma.trt.count({
     *   where: {
     *     // ... the filter for the Trts we want to count
     *   }
     * })
    **/
    count<T extends TrtCountArgs>(
      args?: Subset<T, TrtCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrtCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrtAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrtAggregateArgs>(args: Subset<T, TrtAggregateArgs>): Prisma.PrismaPromise<GetTrtAggregateType<T>>

    /**
     * Group by Trt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrtGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrtGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrtGroupByArgs['orderBy'] }
        : { orderBy?: TrtGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrtGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrtGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Trt model
   */
  readonly fields: TrtFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Trt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrtClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    audiencias<T extends Trt$audienciasArgs<ExtArgs> = {}>(args?: Subset<T, Trt$audienciasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AudienciaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Trt model
   */
  interface TrtFieldRefs {
    readonly id: FieldRef<"Trt", 'String'>
    readonly numero: FieldRef<"Trt", 'String'>
    readonly nome: FieldRef<"Trt", 'String'>
    readonly ativo: FieldRef<"Trt", 'Boolean'>
    readonly createdAt: FieldRef<"Trt", 'DateTime'>
    readonly updatedAt: FieldRef<"Trt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Trt findUnique
   */
  export type TrtFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trt
     */
    select?: TrtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trt
     */
    omit?: TrtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrtInclude<ExtArgs> | null
    /**
     * Filter, which Trt to fetch.
     */
    where: TrtWhereUniqueInput
  }

  /**
   * Trt findUniqueOrThrow
   */
  export type TrtFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trt
     */
    select?: TrtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trt
     */
    omit?: TrtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrtInclude<ExtArgs> | null
    /**
     * Filter, which Trt to fetch.
     */
    where: TrtWhereUniqueInput
  }

  /**
   * Trt findFirst
   */
  export type TrtFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trt
     */
    select?: TrtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trt
     */
    omit?: TrtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrtInclude<ExtArgs> | null
    /**
     * Filter, which Trt to fetch.
     */
    where?: TrtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trts to fetch.
     */
    orderBy?: TrtOrderByWithRelationInput | TrtOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trts.
     */
    cursor?: TrtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trts.
     */
    distinct?: TrtScalarFieldEnum | TrtScalarFieldEnum[]
  }

  /**
   * Trt findFirstOrThrow
   */
  export type TrtFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trt
     */
    select?: TrtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trt
     */
    omit?: TrtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrtInclude<ExtArgs> | null
    /**
     * Filter, which Trt to fetch.
     */
    where?: TrtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trts to fetch.
     */
    orderBy?: TrtOrderByWithRelationInput | TrtOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trts.
     */
    cursor?: TrtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trts.
     */
    distinct?: TrtScalarFieldEnum | TrtScalarFieldEnum[]
  }

  /**
   * Trt findMany
   */
  export type TrtFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trt
     */
    select?: TrtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trt
     */
    omit?: TrtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrtInclude<ExtArgs> | null
    /**
     * Filter, which Trts to fetch.
     */
    where?: TrtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trts to fetch.
     */
    orderBy?: TrtOrderByWithRelationInput | TrtOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trts.
     */
    cursor?: TrtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trts.
     */
    skip?: number
    distinct?: TrtScalarFieldEnum | TrtScalarFieldEnum[]
  }

  /**
   * Trt create
   */
  export type TrtCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trt
     */
    select?: TrtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trt
     */
    omit?: TrtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrtInclude<ExtArgs> | null
    /**
     * The data needed to create a Trt.
     */
    data: XOR<TrtCreateInput, TrtUncheckedCreateInput>
  }

  /**
   * Trt createMany
   */
  export type TrtCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trts.
     */
    data: TrtCreateManyInput | TrtCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Trt createManyAndReturn
   */
  export type TrtCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trt
     */
    select?: TrtSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trt
     */
    omit?: TrtOmit<ExtArgs> | null
    /**
     * The data used to create many Trts.
     */
    data: TrtCreateManyInput | TrtCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Trt update
   */
  export type TrtUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trt
     */
    select?: TrtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trt
     */
    omit?: TrtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrtInclude<ExtArgs> | null
    /**
     * The data needed to update a Trt.
     */
    data: XOR<TrtUpdateInput, TrtUncheckedUpdateInput>
    /**
     * Choose, which Trt to update.
     */
    where: TrtWhereUniqueInput
  }

  /**
   * Trt updateMany
   */
  export type TrtUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trts.
     */
    data: XOR<TrtUpdateManyMutationInput, TrtUncheckedUpdateManyInput>
    /**
     * Filter which Trts to update
     */
    where?: TrtWhereInput
    /**
     * Limit how many Trts to update.
     */
    limit?: number
  }

  /**
   * Trt updateManyAndReturn
   */
  export type TrtUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trt
     */
    select?: TrtSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trt
     */
    omit?: TrtOmit<ExtArgs> | null
    /**
     * The data used to update Trts.
     */
    data: XOR<TrtUpdateManyMutationInput, TrtUncheckedUpdateManyInput>
    /**
     * Filter which Trts to update
     */
    where?: TrtWhereInput
    /**
     * Limit how many Trts to update.
     */
    limit?: number
  }

  /**
   * Trt upsert
   */
  export type TrtUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trt
     */
    select?: TrtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trt
     */
    omit?: TrtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrtInclude<ExtArgs> | null
    /**
     * The filter to search for the Trt to update in case it exists.
     */
    where: TrtWhereUniqueInput
    /**
     * In case the Trt found by the `where` argument doesn't exist, create a new Trt with this data.
     */
    create: XOR<TrtCreateInput, TrtUncheckedCreateInput>
    /**
     * In case the Trt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrtUpdateInput, TrtUncheckedUpdateInput>
  }

  /**
   * Trt delete
   */
  export type TrtDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trt
     */
    select?: TrtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trt
     */
    omit?: TrtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrtInclude<ExtArgs> | null
    /**
     * Filter which Trt to delete.
     */
    where: TrtWhereUniqueInput
  }

  /**
   * Trt deleteMany
   */
  export type TrtDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trts to delete
     */
    where?: TrtWhereInput
    /**
     * Limit how many Trts to delete.
     */
    limit?: number
  }

  /**
   * Trt.audiencias
   */
  export type Trt$audienciasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audiencia
     */
    select?: AudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Audiencia
     */
    omit?: AudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudienciaInclude<ExtArgs> | null
    where?: AudienciaWhereInput
    orderBy?: AudienciaOrderByWithRelationInput | AudienciaOrderByWithRelationInput[]
    cursor?: AudienciaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AudienciaScalarFieldEnum | AudienciaScalarFieldEnum[]
  }

  /**
   * Trt without action
   */
  export type TrtDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trt
     */
    select?: TrtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trt
     */
    omit?: TrtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrtInclude<ExtArgs> | null
  }


  /**
   * Model Preposto
   */

  export type AggregatePreposto = {
    _count: PrepostoCountAggregateOutputType | null
    _min: PrepostoMinAggregateOutputType | null
    _max: PrepostoMaxAggregateOutputType | null
  }

  export type PrepostoMinAggregateOutputType = {
    id: string | null
    nome: string | null
    telefoneWhatsapp: string | null
    email: string | null
    cpf: string | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrepostoMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    telefoneWhatsapp: string | null
    email: string | null
    cpf: string | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrepostoCountAggregateOutputType = {
    id: number
    nome: number
    telefoneWhatsapp: number
    email: number
    cpf: number
    ativo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PrepostoMinAggregateInputType = {
    id?: true
    nome?: true
    telefoneWhatsapp?: true
    email?: true
    cpf?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrepostoMaxAggregateInputType = {
    id?: true
    nome?: true
    telefoneWhatsapp?: true
    email?: true
    cpf?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrepostoCountAggregateInputType = {
    id?: true
    nome?: true
    telefoneWhatsapp?: true
    email?: true
    cpf?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PrepostoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Preposto to aggregate.
     */
    where?: PrepostoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prepostos to fetch.
     */
    orderBy?: PrepostoOrderByWithRelationInput | PrepostoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PrepostoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prepostos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prepostos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Prepostos
    **/
    _count?: true | PrepostoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrepostoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrepostoMaxAggregateInputType
  }

  export type GetPrepostoAggregateType<T extends PrepostoAggregateArgs> = {
        [P in keyof T & keyof AggregatePreposto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePreposto[P]>
      : GetScalarType<T[P], AggregatePreposto[P]>
  }




  export type PrepostoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrepostoWhereInput
    orderBy?: PrepostoOrderByWithAggregationInput | PrepostoOrderByWithAggregationInput[]
    by: PrepostoScalarFieldEnum[] | PrepostoScalarFieldEnum
    having?: PrepostoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrepostoCountAggregateInputType | true
    _min?: PrepostoMinAggregateInputType
    _max?: PrepostoMaxAggregateInputType
  }

  export type PrepostoGroupByOutputType = {
    id: string
    nome: string
    telefoneWhatsapp: string
    email: string | null
    cpf: string | null
    ativo: boolean
    createdAt: Date
    updatedAt: Date
    _count: PrepostoCountAggregateOutputType | null
    _min: PrepostoMinAggregateOutputType | null
    _max: PrepostoMaxAggregateOutputType | null
  }

  type GetPrepostoGroupByPayload<T extends PrepostoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrepostoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrepostoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrepostoGroupByOutputType[P]>
            : GetScalarType<T[P], PrepostoGroupByOutputType[P]>
        }
      >
    >


  export type PrepostoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    telefoneWhatsapp?: boolean
    email?: boolean
    cpf?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    audiencias?: boolean | Preposto$audienciasArgs<ExtArgs>
    mensagens?: boolean | Preposto$mensagensArgs<ExtArgs>
    substituicoesAnterior?: boolean | Preposto$substituicoesAnteriorArgs<ExtArgs>
    substituicoesNovo?: boolean | Preposto$substituicoesNovoArgs<ExtArgs>
    _count?: boolean | PrepostoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preposto"]>

  export type PrepostoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    telefoneWhatsapp?: boolean
    email?: boolean
    cpf?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["preposto"]>

  export type PrepostoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    telefoneWhatsapp?: boolean
    email?: boolean
    cpf?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["preposto"]>

  export type PrepostoSelectScalar = {
    id?: boolean
    nome?: boolean
    telefoneWhatsapp?: boolean
    email?: boolean
    cpf?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PrepostoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "telefoneWhatsapp" | "email" | "cpf" | "ativo" | "createdAt" | "updatedAt", ExtArgs["result"]["preposto"]>
  export type PrepostoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audiencias?: boolean | Preposto$audienciasArgs<ExtArgs>
    mensagens?: boolean | Preposto$mensagensArgs<ExtArgs>
    substituicoesAnterior?: boolean | Preposto$substituicoesAnteriorArgs<ExtArgs>
    substituicoesNovo?: boolean | Preposto$substituicoesNovoArgs<ExtArgs>
    _count?: boolean | PrepostoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PrepostoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PrepostoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PrepostoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Preposto"
    objects: {
      audiencias: Prisma.$AudienciaPayload<ExtArgs>[]
      mensagens: Prisma.$MensagemPayload<ExtArgs>[]
      substituicoesAnterior: Prisma.$SubstituicaoPayload<ExtArgs>[]
      substituicoesNovo: Prisma.$SubstituicaoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      telefoneWhatsapp: string
      email: string | null
      cpf: string | null
      ativo: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["preposto"]>
    composites: {}
  }

  type PrepostoGetPayload<S extends boolean | null | undefined | PrepostoDefaultArgs> = $Result.GetResult<Prisma.$PrepostoPayload, S>

  type PrepostoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PrepostoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PrepostoCountAggregateInputType | true
    }

  export interface PrepostoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Preposto'], meta: { name: 'Preposto' } }
    /**
     * Find zero or one Preposto that matches the filter.
     * @param {PrepostoFindUniqueArgs} args - Arguments to find a Preposto
     * @example
     * // Get one Preposto
     * const preposto = await prisma.preposto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PrepostoFindUniqueArgs>(args: SelectSubset<T, PrepostoFindUniqueArgs<ExtArgs>>): Prisma__PrepostoClient<$Result.GetResult<Prisma.$PrepostoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Preposto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PrepostoFindUniqueOrThrowArgs} args - Arguments to find a Preposto
     * @example
     * // Get one Preposto
     * const preposto = await prisma.preposto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PrepostoFindUniqueOrThrowArgs>(args: SelectSubset<T, PrepostoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PrepostoClient<$Result.GetResult<Prisma.$PrepostoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Preposto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrepostoFindFirstArgs} args - Arguments to find a Preposto
     * @example
     * // Get one Preposto
     * const preposto = await prisma.preposto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PrepostoFindFirstArgs>(args?: SelectSubset<T, PrepostoFindFirstArgs<ExtArgs>>): Prisma__PrepostoClient<$Result.GetResult<Prisma.$PrepostoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Preposto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrepostoFindFirstOrThrowArgs} args - Arguments to find a Preposto
     * @example
     * // Get one Preposto
     * const preposto = await prisma.preposto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PrepostoFindFirstOrThrowArgs>(args?: SelectSubset<T, PrepostoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PrepostoClient<$Result.GetResult<Prisma.$PrepostoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Prepostos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrepostoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prepostos
     * const prepostos = await prisma.preposto.findMany()
     * 
     * // Get first 10 Prepostos
     * const prepostos = await prisma.preposto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const prepostoWithIdOnly = await prisma.preposto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PrepostoFindManyArgs>(args?: SelectSubset<T, PrepostoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrepostoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Preposto.
     * @param {PrepostoCreateArgs} args - Arguments to create a Preposto.
     * @example
     * // Create one Preposto
     * const Preposto = await prisma.preposto.create({
     *   data: {
     *     // ... data to create a Preposto
     *   }
     * })
     * 
     */
    create<T extends PrepostoCreateArgs>(args: SelectSubset<T, PrepostoCreateArgs<ExtArgs>>): Prisma__PrepostoClient<$Result.GetResult<Prisma.$PrepostoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Prepostos.
     * @param {PrepostoCreateManyArgs} args - Arguments to create many Prepostos.
     * @example
     * // Create many Prepostos
     * const preposto = await prisma.preposto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PrepostoCreateManyArgs>(args?: SelectSubset<T, PrepostoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Prepostos and returns the data saved in the database.
     * @param {PrepostoCreateManyAndReturnArgs} args - Arguments to create many Prepostos.
     * @example
     * // Create many Prepostos
     * const preposto = await prisma.preposto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Prepostos and only return the `id`
     * const prepostoWithIdOnly = await prisma.preposto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PrepostoCreateManyAndReturnArgs>(args?: SelectSubset<T, PrepostoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrepostoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Preposto.
     * @param {PrepostoDeleteArgs} args - Arguments to delete one Preposto.
     * @example
     * // Delete one Preposto
     * const Preposto = await prisma.preposto.delete({
     *   where: {
     *     // ... filter to delete one Preposto
     *   }
     * })
     * 
     */
    delete<T extends PrepostoDeleteArgs>(args: SelectSubset<T, PrepostoDeleteArgs<ExtArgs>>): Prisma__PrepostoClient<$Result.GetResult<Prisma.$PrepostoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Preposto.
     * @param {PrepostoUpdateArgs} args - Arguments to update one Preposto.
     * @example
     * // Update one Preposto
     * const preposto = await prisma.preposto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PrepostoUpdateArgs>(args: SelectSubset<T, PrepostoUpdateArgs<ExtArgs>>): Prisma__PrepostoClient<$Result.GetResult<Prisma.$PrepostoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Prepostos.
     * @param {PrepostoDeleteManyArgs} args - Arguments to filter Prepostos to delete.
     * @example
     * // Delete a few Prepostos
     * const { count } = await prisma.preposto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PrepostoDeleteManyArgs>(args?: SelectSubset<T, PrepostoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prepostos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrepostoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prepostos
     * const preposto = await prisma.preposto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PrepostoUpdateManyArgs>(args: SelectSubset<T, PrepostoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prepostos and returns the data updated in the database.
     * @param {PrepostoUpdateManyAndReturnArgs} args - Arguments to update many Prepostos.
     * @example
     * // Update many Prepostos
     * const preposto = await prisma.preposto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Prepostos and only return the `id`
     * const prepostoWithIdOnly = await prisma.preposto.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PrepostoUpdateManyAndReturnArgs>(args: SelectSubset<T, PrepostoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrepostoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Preposto.
     * @param {PrepostoUpsertArgs} args - Arguments to update or create a Preposto.
     * @example
     * // Update or create a Preposto
     * const preposto = await prisma.preposto.upsert({
     *   create: {
     *     // ... data to create a Preposto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Preposto we want to update
     *   }
     * })
     */
    upsert<T extends PrepostoUpsertArgs>(args: SelectSubset<T, PrepostoUpsertArgs<ExtArgs>>): Prisma__PrepostoClient<$Result.GetResult<Prisma.$PrepostoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Prepostos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrepostoCountArgs} args - Arguments to filter Prepostos to count.
     * @example
     * // Count the number of Prepostos
     * const count = await prisma.preposto.count({
     *   where: {
     *     // ... the filter for the Prepostos we want to count
     *   }
     * })
    **/
    count<T extends PrepostoCountArgs>(
      args?: Subset<T, PrepostoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrepostoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Preposto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrepostoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PrepostoAggregateArgs>(args: Subset<T, PrepostoAggregateArgs>): Prisma.PrismaPromise<GetPrepostoAggregateType<T>>

    /**
     * Group by Preposto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrepostoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PrepostoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrepostoGroupByArgs['orderBy'] }
        : { orderBy?: PrepostoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PrepostoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrepostoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Preposto model
   */
  readonly fields: PrepostoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Preposto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PrepostoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    audiencias<T extends Preposto$audienciasArgs<ExtArgs> = {}>(args?: Subset<T, Preposto$audienciasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AudienciaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    mensagens<T extends Preposto$mensagensArgs<ExtArgs> = {}>(args?: Subset<T, Preposto$mensagensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    substituicoesAnterior<T extends Preposto$substituicoesAnteriorArgs<ExtArgs> = {}>(args?: Subset<T, Preposto$substituicoesAnteriorArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubstituicaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    substituicoesNovo<T extends Preposto$substituicoesNovoArgs<ExtArgs> = {}>(args?: Subset<T, Preposto$substituicoesNovoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubstituicaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Preposto model
   */
  interface PrepostoFieldRefs {
    readonly id: FieldRef<"Preposto", 'String'>
    readonly nome: FieldRef<"Preposto", 'String'>
    readonly telefoneWhatsapp: FieldRef<"Preposto", 'String'>
    readonly email: FieldRef<"Preposto", 'String'>
    readonly cpf: FieldRef<"Preposto", 'String'>
    readonly ativo: FieldRef<"Preposto", 'Boolean'>
    readonly createdAt: FieldRef<"Preposto", 'DateTime'>
    readonly updatedAt: FieldRef<"Preposto", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Preposto findUnique
   */
  export type PrepostoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preposto
     */
    select?: PrepostoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preposto
     */
    omit?: PrepostoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrepostoInclude<ExtArgs> | null
    /**
     * Filter, which Preposto to fetch.
     */
    where: PrepostoWhereUniqueInput
  }

  /**
   * Preposto findUniqueOrThrow
   */
  export type PrepostoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preposto
     */
    select?: PrepostoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preposto
     */
    omit?: PrepostoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrepostoInclude<ExtArgs> | null
    /**
     * Filter, which Preposto to fetch.
     */
    where: PrepostoWhereUniqueInput
  }

  /**
   * Preposto findFirst
   */
  export type PrepostoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preposto
     */
    select?: PrepostoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preposto
     */
    omit?: PrepostoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrepostoInclude<ExtArgs> | null
    /**
     * Filter, which Preposto to fetch.
     */
    where?: PrepostoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prepostos to fetch.
     */
    orderBy?: PrepostoOrderByWithRelationInput | PrepostoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prepostos.
     */
    cursor?: PrepostoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prepostos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prepostos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prepostos.
     */
    distinct?: PrepostoScalarFieldEnum | PrepostoScalarFieldEnum[]
  }

  /**
   * Preposto findFirstOrThrow
   */
  export type PrepostoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preposto
     */
    select?: PrepostoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preposto
     */
    omit?: PrepostoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrepostoInclude<ExtArgs> | null
    /**
     * Filter, which Preposto to fetch.
     */
    where?: PrepostoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prepostos to fetch.
     */
    orderBy?: PrepostoOrderByWithRelationInput | PrepostoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prepostos.
     */
    cursor?: PrepostoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prepostos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prepostos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prepostos.
     */
    distinct?: PrepostoScalarFieldEnum | PrepostoScalarFieldEnum[]
  }

  /**
   * Preposto findMany
   */
  export type PrepostoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preposto
     */
    select?: PrepostoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preposto
     */
    omit?: PrepostoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrepostoInclude<ExtArgs> | null
    /**
     * Filter, which Prepostos to fetch.
     */
    where?: PrepostoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prepostos to fetch.
     */
    orderBy?: PrepostoOrderByWithRelationInput | PrepostoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Prepostos.
     */
    cursor?: PrepostoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prepostos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prepostos.
     */
    skip?: number
    distinct?: PrepostoScalarFieldEnum | PrepostoScalarFieldEnum[]
  }

  /**
   * Preposto create
   */
  export type PrepostoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preposto
     */
    select?: PrepostoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preposto
     */
    omit?: PrepostoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrepostoInclude<ExtArgs> | null
    /**
     * The data needed to create a Preposto.
     */
    data: XOR<PrepostoCreateInput, PrepostoUncheckedCreateInput>
  }

  /**
   * Preposto createMany
   */
  export type PrepostoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Prepostos.
     */
    data: PrepostoCreateManyInput | PrepostoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Preposto createManyAndReturn
   */
  export type PrepostoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preposto
     */
    select?: PrepostoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Preposto
     */
    omit?: PrepostoOmit<ExtArgs> | null
    /**
     * The data used to create many Prepostos.
     */
    data: PrepostoCreateManyInput | PrepostoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Preposto update
   */
  export type PrepostoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preposto
     */
    select?: PrepostoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preposto
     */
    omit?: PrepostoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrepostoInclude<ExtArgs> | null
    /**
     * The data needed to update a Preposto.
     */
    data: XOR<PrepostoUpdateInput, PrepostoUncheckedUpdateInput>
    /**
     * Choose, which Preposto to update.
     */
    where: PrepostoWhereUniqueInput
  }

  /**
   * Preposto updateMany
   */
  export type PrepostoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Prepostos.
     */
    data: XOR<PrepostoUpdateManyMutationInput, PrepostoUncheckedUpdateManyInput>
    /**
     * Filter which Prepostos to update
     */
    where?: PrepostoWhereInput
    /**
     * Limit how many Prepostos to update.
     */
    limit?: number
  }

  /**
   * Preposto updateManyAndReturn
   */
  export type PrepostoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preposto
     */
    select?: PrepostoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Preposto
     */
    omit?: PrepostoOmit<ExtArgs> | null
    /**
     * The data used to update Prepostos.
     */
    data: XOR<PrepostoUpdateManyMutationInput, PrepostoUncheckedUpdateManyInput>
    /**
     * Filter which Prepostos to update
     */
    where?: PrepostoWhereInput
    /**
     * Limit how many Prepostos to update.
     */
    limit?: number
  }

  /**
   * Preposto upsert
   */
  export type PrepostoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preposto
     */
    select?: PrepostoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preposto
     */
    omit?: PrepostoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrepostoInclude<ExtArgs> | null
    /**
     * The filter to search for the Preposto to update in case it exists.
     */
    where: PrepostoWhereUniqueInput
    /**
     * In case the Preposto found by the `where` argument doesn't exist, create a new Preposto with this data.
     */
    create: XOR<PrepostoCreateInput, PrepostoUncheckedCreateInput>
    /**
     * In case the Preposto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PrepostoUpdateInput, PrepostoUncheckedUpdateInput>
  }

  /**
   * Preposto delete
   */
  export type PrepostoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preposto
     */
    select?: PrepostoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preposto
     */
    omit?: PrepostoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrepostoInclude<ExtArgs> | null
    /**
     * Filter which Preposto to delete.
     */
    where: PrepostoWhereUniqueInput
  }

  /**
   * Preposto deleteMany
   */
  export type PrepostoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prepostos to delete
     */
    where?: PrepostoWhereInput
    /**
     * Limit how many Prepostos to delete.
     */
    limit?: number
  }

  /**
   * Preposto.audiencias
   */
  export type Preposto$audienciasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audiencia
     */
    select?: AudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Audiencia
     */
    omit?: AudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudienciaInclude<ExtArgs> | null
    where?: AudienciaWhereInput
    orderBy?: AudienciaOrderByWithRelationInput | AudienciaOrderByWithRelationInput[]
    cursor?: AudienciaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AudienciaScalarFieldEnum | AudienciaScalarFieldEnum[]
  }

  /**
   * Preposto.mensagens
   */
  export type Preposto$mensagensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagem
     */
    omit?: MensagemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    where?: MensagemWhereInput
    orderBy?: MensagemOrderByWithRelationInput | MensagemOrderByWithRelationInput[]
    cursor?: MensagemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MensagemScalarFieldEnum | MensagemScalarFieldEnum[]
  }

  /**
   * Preposto.substituicoesAnterior
   */
  export type Preposto$substituicoesAnteriorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Substituicao
     */
    select?: SubstituicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Substituicao
     */
    omit?: SubstituicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubstituicaoInclude<ExtArgs> | null
    where?: SubstituicaoWhereInput
    orderBy?: SubstituicaoOrderByWithRelationInput | SubstituicaoOrderByWithRelationInput[]
    cursor?: SubstituicaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubstituicaoScalarFieldEnum | SubstituicaoScalarFieldEnum[]
  }

  /**
   * Preposto.substituicoesNovo
   */
  export type Preposto$substituicoesNovoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Substituicao
     */
    select?: SubstituicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Substituicao
     */
    omit?: SubstituicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubstituicaoInclude<ExtArgs> | null
    where?: SubstituicaoWhereInput
    orderBy?: SubstituicaoOrderByWithRelationInput | SubstituicaoOrderByWithRelationInput[]
    cursor?: SubstituicaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubstituicaoScalarFieldEnum | SubstituicaoScalarFieldEnum[]
  }

  /**
   * Preposto without action
   */
  export type PrepostoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preposto
     */
    select?: PrepostoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preposto
     */
    omit?: PrepostoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrepostoInclude<ExtArgs> | null
  }


  /**
   * Model Parceiro
   */

  export type AggregateParceiro = {
    _count: ParceiroCountAggregateOutputType | null
    _min: ParceiroMinAggregateOutputType | null
    _max: ParceiroMaxAggregateOutputType | null
  }

  export type ParceiroMinAggregateOutputType = {
    id: string | null
    nome: string | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ParceiroMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ParceiroCountAggregateOutputType = {
    id: number
    nome: number
    ativo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ParceiroMinAggregateInputType = {
    id?: true
    nome?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ParceiroMaxAggregateInputType = {
    id?: true
    nome?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ParceiroCountAggregateInputType = {
    id?: true
    nome?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ParceiroAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parceiro to aggregate.
     */
    where?: ParceiroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parceiros to fetch.
     */
    orderBy?: ParceiroOrderByWithRelationInput | ParceiroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParceiroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parceiros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parceiros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Parceiros
    **/
    _count?: true | ParceiroCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParceiroMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParceiroMaxAggregateInputType
  }

  export type GetParceiroAggregateType<T extends ParceiroAggregateArgs> = {
        [P in keyof T & keyof AggregateParceiro]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParceiro[P]>
      : GetScalarType<T[P], AggregateParceiro[P]>
  }




  export type ParceiroGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParceiroWhereInput
    orderBy?: ParceiroOrderByWithAggregationInput | ParceiroOrderByWithAggregationInput[]
    by: ParceiroScalarFieldEnum[] | ParceiroScalarFieldEnum
    having?: ParceiroScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParceiroCountAggregateInputType | true
    _min?: ParceiroMinAggregateInputType
    _max?: ParceiroMaxAggregateInputType
  }

  export type ParceiroGroupByOutputType = {
    id: string
    nome: string
    ativo: boolean
    createdAt: Date
    updatedAt: Date
    _count: ParceiroCountAggregateOutputType | null
    _min: ParceiroMinAggregateOutputType | null
    _max: ParceiroMaxAggregateOutputType | null
  }

  type GetParceiroGroupByPayload<T extends ParceiroGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParceiroGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParceiroGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParceiroGroupByOutputType[P]>
            : GetScalarType<T[P], ParceiroGroupByOutputType[P]>
        }
      >
    >


  export type ParceiroSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    contatos?: boolean | Parceiro$contatosArgs<ExtArgs>
    audiencias?: boolean | Parceiro$audienciasArgs<ExtArgs>
    _count?: boolean | ParceiroCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parceiro"]>

  export type ParceiroSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["parceiro"]>

  export type ParceiroSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["parceiro"]>

  export type ParceiroSelectScalar = {
    id?: boolean
    nome?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ParceiroOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "ativo" | "createdAt" | "updatedAt", ExtArgs["result"]["parceiro"]>
  export type ParceiroInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contatos?: boolean | Parceiro$contatosArgs<ExtArgs>
    audiencias?: boolean | Parceiro$audienciasArgs<ExtArgs>
    _count?: boolean | ParceiroCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ParceiroIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ParceiroIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ParceiroPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Parceiro"
    objects: {
      contatos: Prisma.$ContatoParceiroPayload<ExtArgs>[]
      audiencias: Prisma.$AudienciaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      ativo: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["parceiro"]>
    composites: {}
  }

  type ParceiroGetPayload<S extends boolean | null | undefined | ParceiroDefaultArgs> = $Result.GetResult<Prisma.$ParceiroPayload, S>

  type ParceiroCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ParceiroFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParceiroCountAggregateInputType | true
    }

  export interface ParceiroDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Parceiro'], meta: { name: 'Parceiro' } }
    /**
     * Find zero or one Parceiro that matches the filter.
     * @param {ParceiroFindUniqueArgs} args - Arguments to find a Parceiro
     * @example
     * // Get one Parceiro
     * const parceiro = await prisma.parceiro.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParceiroFindUniqueArgs>(args: SelectSubset<T, ParceiroFindUniqueArgs<ExtArgs>>): Prisma__ParceiroClient<$Result.GetResult<Prisma.$ParceiroPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Parceiro that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParceiroFindUniqueOrThrowArgs} args - Arguments to find a Parceiro
     * @example
     * // Get one Parceiro
     * const parceiro = await prisma.parceiro.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParceiroFindUniqueOrThrowArgs>(args: SelectSubset<T, ParceiroFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParceiroClient<$Result.GetResult<Prisma.$ParceiroPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Parceiro that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParceiroFindFirstArgs} args - Arguments to find a Parceiro
     * @example
     * // Get one Parceiro
     * const parceiro = await prisma.parceiro.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParceiroFindFirstArgs>(args?: SelectSubset<T, ParceiroFindFirstArgs<ExtArgs>>): Prisma__ParceiroClient<$Result.GetResult<Prisma.$ParceiroPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Parceiro that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParceiroFindFirstOrThrowArgs} args - Arguments to find a Parceiro
     * @example
     * // Get one Parceiro
     * const parceiro = await prisma.parceiro.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParceiroFindFirstOrThrowArgs>(args?: SelectSubset<T, ParceiroFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParceiroClient<$Result.GetResult<Prisma.$ParceiroPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Parceiros that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParceiroFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Parceiros
     * const parceiros = await prisma.parceiro.findMany()
     * 
     * // Get first 10 Parceiros
     * const parceiros = await prisma.parceiro.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const parceiroWithIdOnly = await prisma.parceiro.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParceiroFindManyArgs>(args?: SelectSubset<T, ParceiroFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParceiroPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Parceiro.
     * @param {ParceiroCreateArgs} args - Arguments to create a Parceiro.
     * @example
     * // Create one Parceiro
     * const Parceiro = await prisma.parceiro.create({
     *   data: {
     *     // ... data to create a Parceiro
     *   }
     * })
     * 
     */
    create<T extends ParceiroCreateArgs>(args: SelectSubset<T, ParceiroCreateArgs<ExtArgs>>): Prisma__ParceiroClient<$Result.GetResult<Prisma.$ParceiroPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Parceiros.
     * @param {ParceiroCreateManyArgs} args - Arguments to create many Parceiros.
     * @example
     * // Create many Parceiros
     * const parceiro = await prisma.parceiro.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParceiroCreateManyArgs>(args?: SelectSubset<T, ParceiroCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Parceiros and returns the data saved in the database.
     * @param {ParceiroCreateManyAndReturnArgs} args - Arguments to create many Parceiros.
     * @example
     * // Create many Parceiros
     * const parceiro = await prisma.parceiro.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Parceiros and only return the `id`
     * const parceiroWithIdOnly = await prisma.parceiro.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ParceiroCreateManyAndReturnArgs>(args?: SelectSubset<T, ParceiroCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParceiroPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Parceiro.
     * @param {ParceiroDeleteArgs} args - Arguments to delete one Parceiro.
     * @example
     * // Delete one Parceiro
     * const Parceiro = await prisma.parceiro.delete({
     *   where: {
     *     // ... filter to delete one Parceiro
     *   }
     * })
     * 
     */
    delete<T extends ParceiroDeleteArgs>(args: SelectSubset<T, ParceiroDeleteArgs<ExtArgs>>): Prisma__ParceiroClient<$Result.GetResult<Prisma.$ParceiroPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Parceiro.
     * @param {ParceiroUpdateArgs} args - Arguments to update one Parceiro.
     * @example
     * // Update one Parceiro
     * const parceiro = await prisma.parceiro.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParceiroUpdateArgs>(args: SelectSubset<T, ParceiroUpdateArgs<ExtArgs>>): Prisma__ParceiroClient<$Result.GetResult<Prisma.$ParceiroPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Parceiros.
     * @param {ParceiroDeleteManyArgs} args - Arguments to filter Parceiros to delete.
     * @example
     * // Delete a few Parceiros
     * const { count } = await prisma.parceiro.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParceiroDeleteManyArgs>(args?: SelectSubset<T, ParceiroDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parceiros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParceiroUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Parceiros
     * const parceiro = await prisma.parceiro.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParceiroUpdateManyArgs>(args: SelectSubset<T, ParceiroUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parceiros and returns the data updated in the database.
     * @param {ParceiroUpdateManyAndReturnArgs} args - Arguments to update many Parceiros.
     * @example
     * // Update many Parceiros
     * const parceiro = await prisma.parceiro.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Parceiros and only return the `id`
     * const parceiroWithIdOnly = await prisma.parceiro.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ParceiroUpdateManyAndReturnArgs>(args: SelectSubset<T, ParceiroUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParceiroPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Parceiro.
     * @param {ParceiroUpsertArgs} args - Arguments to update or create a Parceiro.
     * @example
     * // Update or create a Parceiro
     * const parceiro = await prisma.parceiro.upsert({
     *   create: {
     *     // ... data to create a Parceiro
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Parceiro we want to update
     *   }
     * })
     */
    upsert<T extends ParceiroUpsertArgs>(args: SelectSubset<T, ParceiroUpsertArgs<ExtArgs>>): Prisma__ParceiroClient<$Result.GetResult<Prisma.$ParceiroPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Parceiros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParceiroCountArgs} args - Arguments to filter Parceiros to count.
     * @example
     * // Count the number of Parceiros
     * const count = await prisma.parceiro.count({
     *   where: {
     *     // ... the filter for the Parceiros we want to count
     *   }
     * })
    **/
    count<T extends ParceiroCountArgs>(
      args?: Subset<T, ParceiroCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParceiroCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Parceiro.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParceiroAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParceiroAggregateArgs>(args: Subset<T, ParceiroAggregateArgs>): Prisma.PrismaPromise<GetParceiroAggregateType<T>>

    /**
     * Group by Parceiro.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParceiroGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParceiroGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParceiroGroupByArgs['orderBy'] }
        : { orderBy?: ParceiroGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParceiroGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParceiroGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Parceiro model
   */
  readonly fields: ParceiroFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Parceiro.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParceiroClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contatos<T extends Parceiro$contatosArgs<ExtArgs> = {}>(args?: Subset<T, Parceiro$contatosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContatoParceiroPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    audiencias<T extends Parceiro$audienciasArgs<ExtArgs> = {}>(args?: Subset<T, Parceiro$audienciasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AudienciaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Parceiro model
   */
  interface ParceiroFieldRefs {
    readonly id: FieldRef<"Parceiro", 'String'>
    readonly nome: FieldRef<"Parceiro", 'String'>
    readonly ativo: FieldRef<"Parceiro", 'Boolean'>
    readonly createdAt: FieldRef<"Parceiro", 'DateTime'>
    readonly updatedAt: FieldRef<"Parceiro", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Parceiro findUnique
   */
  export type ParceiroFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parceiro
     */
    select?: ParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parceiro
     */
    omit?: ParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParceiroInclude<ExtArgs> | null
    /**
     * Filter, which Parceiro to fetch.
     */
    where: ParceiroWhereUniqueInput
  }

  /**
   * Parceiro findUniqueOrThrow
   */
  export type ParceiroFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parceiro
     */
    select?: ParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parceiro
     */
    omit?: ParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParceiroInclude<ExtArgs> | null
    /**
     * Filter, which Parceiro to fetch.
     */
    where: ParceiroWhereUniqueInput
  }

  /**
   * Parceiro findFirst
   */
  export type ParceiroFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parceiro
     */
    select?: ParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parceiro
     */
    omit?: ParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParceiroInclude<ExtArgs> | null
    /**
     * Filter, which Parceiro to fetch.
     */
    where?: ParceiroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parceiros to fetch.
     */
    orderBy?: ParceiroOrderByWithRelationInput | ParceiroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parceiros.
     */
    cursor?: ParceiroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parceiros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parceiros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parceiros.
     */
    distinct?: ParceiroScalarFieldEnum | ParceiroScalarFieldEnum[]
  }

  /**
   * Parceiro findFirstOrThrow
   */
  export type ParceiroFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parceiro
     */
    select?: ParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parceiro
     */
    omit?: ParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParceiroInclude<ExtArgs> | null
    /**
     * Filter, which Parceiro to fetch.
     */
    where?: ParceiroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parceiros to fetch.
     */
    orderBy?: ParceiroOrderByWithRelationInput | ParceiroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parceiros.
     */
    cursor?: ParceiroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parceiros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parceiros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parceiros.
     */
    distinct?: ParceiroScalarFieldEnum | ParceiroScalarFieldEnum[]
  }

  /**
   * Parceiro findMany
   */
  export type ParceiroFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parceiro
     */
    select?: ParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parceiro
     */
    omit?: ParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParceiroInclude<ExtArgs> | null
    /**
     * Filter, which Parceiros to fetch.
     */
    where?: ParceiroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parceiros to fetch.
     */
    orderBy?: ParceiroOrderByWithRelationInput | ParceiroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Parceiros.
     */
    cursor?: ParceiroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parceiros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parceiros.
     */
    skip?: number
    distinct?: ParceiroScalarFieldEnum | ParceiroScalarFieldEnum[]
  }

  /**
   * Parceiro create
   */
  export type ParceiroCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parceiro
     */
    select?: ParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parceiro
     */
    omit?: ParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParceiroInclude<ExtArgs> | null
    /**
     * The data needed to create a Parceiro.
     */
    data: XOR<ParceiroCreateInput, ParceiroUncheckedCreateInput>
  }

  /**
   * Parceiro createMany
   */
  export type ParceiroCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Parceiros.
     */
    data: ParceiroCreateManyInput | ParceiroCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Parceiro createManyAndReturn
   */
  export type ParceiroCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parceiro
     */
    select?: ParceiroSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Parceiro
     */
    omit?: ParceiroOmit<ExtArgs> | null
    /**
     * The data used to create many Parceiros.
     */
    data: ParceiroCreateManyInput | ParceiroCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Parceiro update
   */
  export type ParceiroUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parceiro
     */
    select?: ParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parceiro
     */
    omit?: ParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParceiroInclude<ExtArgs> | null
    /**
     * The data needed to update a Parceiro.
     */
    data: XOR<ParceiroUpdateInput, ParceiroUncheckedUpdateInput>
    /**
     * Choose, which Parceiro to update.
     */
    where: ParceiroWhereUniqueInput
  }

  /**
   * Parceiro updateMany
   */
  export type ParceiroUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Parceiros.
     */
    data: XOR<ParceiroUpdateManyMutationInput, ParceiroUncheckedUpdateManyInput>
    /**
     * Filter which Parceiros to update
     */
    where?: ParceiroWhereInput
    /**
     * Limit how many Parceiros to update.
     */
    limit?: number
  }

  /**
   * Parceiro updateManyAndReturn
   */
  export type ParceiroUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parceiro
     */
    select?: ParceiroSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Parceiro
     */
    omit?: ParceiroOmit<ExtArgs> | null
    /**
     * The data used to update Parceiros.
     */
    data: XOR<ParceiroUpdateManyMutationInput, ParceiroUncheckedUpdateManyInput>
    /**
     * Filter which Parceiros to update
     */
    where?: ParceiroWhereInput
    /**
     * Limit how many Parceiros to update.
     */
    limit?: number
  }

  /**
   * Parceiro upsert
   */
  export type ParceiroUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parceiro
     */
    select?: ParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parceiro
     */
    omit?: ParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParceiroInclude<ExtArgs> | null
    /**
     * The filter to search for the Parceiro to update in case it exists.
     */
    where: ParceiroWhereUniqueInput
    /**
     * In case the Parceiro found by the `where` argument doesn't exist, create a new Parceiro with this data.
     */
    create: XOR<ParceiroCreateInput, ParceiroUncheckedCreateInput>
    /**
     * In case the Parceiro was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParceiroUpdateInput, ParceiroUncheckedUpdateInput>
  }

  /**
   * Parceiro delete
   */
  export type ParceiroDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parceiro
     */
    select?: ParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parceiro
     */
    omit?: ParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParceiroInclude<ExtArgs> | null
    /**
     * Filter which Parceiro to delete.
     */
    where: ParceiroWhereUniqueInput
  }

  /**
   * Parceiro deleteMany
   */
  export type ParceiroDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parceiros to delete
     */
    where?: ParceiroWhereInput
    /**
     * Limit how many Parceiros to delete.
     */
    limit?: number
  }

  /**
   * Parceiro.contatos
   */
  export type Parceiro$contatosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContatoParceiro
     */
    select?: ContatoParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContatoParceiro
     */
    omit?: ContatoParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoParceiroInclude<ExtArgs> | null
    where?: ContatoParceiroWhereInput
    orderBy?: ContatoParceiroOrderByWithRelationInput | ContatoParceiroOrderByWithRelationInput[]
    cursor?: ContatoParceiroWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContatoParceiroScalarFieldEnum | ContatoParceiroScalarFieldEnum[]
  }

  /**
   * Parceiro.audiencias
   */
  export type Parceiro$audienciasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audiencia
     */
    select?: AudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Audiencia
     */
    omit?: AudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudienciaInclude<ExtArgs> | null
    where?: AudienciaWhereInput
    orderBy?: AudienciaOrderByWithRelationInput | AudienciaOrderByWithRelationInput[]
    cursor?: AudienciaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AudienciaScalarFieldEnum | AudienciaScalarFieldEnum[]
  }

  /**
   * Parceiro without action
   */
  export type ParceiroDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parceiro
     */
    select?: ParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parceiro
     */
    omit?: ParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParceiroInclude<ExtArgs> | null
  }


  /**
   * Model ContatoParceiro
   */

  export type AggregateContatoParceiro = {
    _count: ContatoParceiroCountAggregateOutputType | null
    _avg: ContatoParceiroAvgAggregateOutputType | null
    _sum: ContatoParceiroSumAggregateOutputType | null
    _min: ContatoParceiroMinAggregateOutputType | null
    _max: ContatoParceiroMaxAggregateOutputType | null
  }

  export type ContatoParceiroAvgAggregateOutputType = {
    ordemEscalonamento: number | null
  }

  export type ContatoParceiroSumAggregateOutputType = {
    ordemEscalonamento: number | null
  }

  export type ContatoParceiroMinAggregateOutputType = {
    id: string | null
    parceiroId: string | null
    nome: string | null
    telefoneWhatsapp: string | null
    email: string | null
    cargo: string | null
    ordemEscalonamento: number | null
    createdAt: Date | null
  }

  export type ContatoParceiroMaxAggregateOutputType = {
    id: string | null
    parceiroId: string | null
    nome: string | null
    telefoneWhatsapp: string | null
    email: string | null
    cargo: string | null
    ordemEscalonamento: number | null
    createdAt: Date | null
  }

  export type ContatoParceiroCountAggregateOutputType = {
    id: number
    parceiroId: number
    nome: number
    telefoneWhatsapp: number
    email: number
    cargo: number
    ordemEscalonamento: number
    createdAt: number
    _all: number
  }


  export type ContatoParceiroAvgAggregateInputType = {
    ordemEscalonamento?: true
  }

  export type ContatoParceiroSumAggregateInputType = {
    ordemEscalonamento?: true
  }

  export type ContatoParceiroMinAggregateInputType = {
    id?: true
    parceiroId?: true
    nome?: true
    telefoneWhatsapp?: true
    email?: true
    cargo?: true
    ordemEscalonamento?: true
    createdAt?: true
  }

  export type ContatoParceiroMaxAggregateInputType = {
    id?: true
    parceiroId?: true
    nome?: true
    telefoneWhatsapp?: true
    email?: true
    cargo?: true
    ordemEscalonamento?: true
    createdAt?: true
  }

  export type ContatoParceiroCountAggregateInputType = {
    id?: true
    parceiroId?: true
    nome?: true
    telefoneWhatsapp?: true
    email?: true
    cargo?: true
    ordemEscalonamento?: true
    createdAt?: true
    _all?: true
  }

  export type ContatoParceiroAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContatoParceiro to aggregate.
     */
    where?: ContatoParceiroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContatoParceiros to fetch.
     */
    orderBy?: ContatoParceiroOrderByWithRelationInput | ContatoParceiroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContatoParceiroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContatoParceiros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContatoParceiros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContatoParceiros
    **/
    _count?: true | ContatoParceiroCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContatoParceiroAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContatoParceiroSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContatoParceiroMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContatoParceiroMaxAggregateInputType
  }

  export type GetContatoParceiroAggregateType<T extends ContatoParceiroAggregateArgs> = {
        [P in keyof T & keyof AggregateContatoParceiro]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContatoParceiro[P]>
      : GetScalarType<T[P], AggregateContatoParceiro[P]>
  }




  export type ContatoParceiroGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContatoParceiroWhereInput
    orderBy?: ContatoParceiroOrderByWithAggregationInput | ContatoParceiroOrderByWithAggregationInput[]
    by: ContatoParceiroScalarFieldEnum[] | ContatoParceiroScalarFieldEnum
    having?: ContatoParceiroScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContatoParceiroCountAggregateInputType | true
    _avg?: ContatoParceiroAvgAggregateInputType
    _sum?: ContatoParceiroSumAggregateInputType
    _min?: ContatoParceiroMinAggregateInputType
    _max?: ContatoParceiroMaxAggregateInputType
  }

  export type ContatoParceiroGroupByOutputType = {
    id: string
    parceiroId: string
    nome: string
    telefoneWhatsapp: string
    email: string | null
    cargo: string | null
    ordemEscalonamento: number
    createdAt: Date
    _count: ContatoParceiroCountAggregateOutputType | null
    _avg: ContatoParceiroAvgAggregateOutputType | null
    _sum: ContatoParceiroSumAggregateOutputType | null
    _min: ContatoParceiroMinAggregateOutputType | null
    _max: ContatoParceiroMaxAggregateOutputType | null
  }

  type GetContatoParceiroGroupByPayload<T extends ContatoParceiroGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContatoParceiroGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContatoParceiroGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContatoParceiroGroupByOutputType[P]>
            : GetScalarType<T[P], ContatoParceiroGroupByOutputType[P]>
        }
      >
    >


  export type ContatoParceiroSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    parceiroId?: boolean
    nome?: boolean
    telefoneWhatsapp?: boolean
    email?: boolean
    cargo?: boolean
    ordemEscalonamento?: boolean
    createdAt?: boolean
    parceiro?: boolean | ParceiroDefaultArgs<ExtArgs>
    mensagens?: boolean | ContatoParceiro$mensagensArgs<ExtArgs>
    _count?: boolean | ContatoParceiroCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contatoParceiro"]>

  export type ContatoParceiroSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    parceiroId?: boolean
    nome?: boolean
    telefoneWhatsapp?: boolean
    email?: boolean
    cargo?: boolean
    ordemEscalonamento?: boolean
    createdAt?: boolean
    parceiro?: boolean | ParceiroDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contatoParceiro"]>

  export type ContatoParceiroSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    parceiroId?: boolean
    nome?: boolean
    telefoneWhatsapp?: boolean
    email?: boolean
    cargo?: boolean
    ordemEscalonamento?: boolean
    createdAt?: boolean
    parceiro?: boolean | ParceiroDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contatoParceiro"]>

  export type ContatoParceiroSelectScalar = {
    id?: boolean
    parceiroId?: boolean
    nome?: boolean
    telefoneWhatsapp?: boolean
    email?: boolean
    cargo?: boolean
    ordemEscalonamento?: boolean
    createdAt?: boolean
  }

  export type ContatoParceiroOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "parceiroId" | "nome" | "telefoneWhatsapp" | "email" | "cargo" | "ordemEscalonamento" | "createdAt", ExtArgs["result"]["contatoParceiro"]>
  export type ContatoParceiroInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parceiro?: boolean | ParceiroDefaultArgs<ExtArgs>
    mensagens?: boolean | ContatoParceiro$mensagensArgs<ExtArgs>
    _count?: boolean | ContatoParceiroCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ContatoParceiroIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parceiro?: boolean | ParceiroDefaultArgs<ExtArgs>
  }
  export type ContatoParceiroIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parceiro?: boolean | ParceiroDefaultArgs<ExtArgs>
  }

  export type $ContatoParceiroPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContatoParceiro"
    objects: {
      parceiro: Prisma.$ParceiroPayload<ExtArgs>
      mensagens: Prisma.$MensagemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      parceiroId: string
      nome: string
      telefoneWhatsapp: string
      email: string | null
      cargo: string | null
      ordemEscalonamento: number
      createdAt: Date
    }, ExtArgs["result"]["contatoParceiro"]>
    composites: {}
  }

  type ContatoParceiroGetPayload<S extends boolean | null | undefined | ContatoParceiroDefaultArgs> = $Result.GetResult<Prisma.$ContatoParceiroPayload, S>

  type ContatoParceiroCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContatoParceiroFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContatoParceiroCountAggregateInputType | true
    }

  export interface ContatoParceiroDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContatoParceiro'], meta: { name: 'ContatoParceiro' } }
    /**
     * Find zero or one ContatoParceiro that matches the filter.
     * @param {ContatoParceiroFindUniqueArgs} args - Arguments to find a ContatoParceiro
     * @example
     * // Get one ContatoParceiro
     * const contatoParceiro = await prisma.contatoParceiro.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContatoParceiroFindUniqueArgs>(args: SelectSubset<T, ContatoParceiroFindUniqueArgs<ExtArgs>>): Prisma__ContatoParceiroClient<$Result.GetResult<Prisma.$ContatoParceiroPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContatoParceiro that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContatoParceiroFindUniqueOrThrowArgs} args - Arguments to find a ContatoParceiro
     * @example
     * // Get one ContatoParceiro
     * const contatoParceiro = await prisma.contatoParceiro.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContatoParceiroFindUniqueOrThrowArgs>(args: SelectSubset<T, ContatoParceiroFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContatoParceiroClient<$Result.GetResult<Prisma.$ContatoParceiroPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContatoParceiro that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoParceiroFindFirstArgs} args - Arguments to find a ContatoParceiro
     * @example
     * // Get one ContatoParceiro
     * const contatoParceiro = await prisma.contatoParceiro.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContatoParceiroFindFirstArgs>(args?: SelectSubset<T, ContatoParceiroFindFirstArgs<ExtArgs>>): Prisma__ContatoParceiroClient<$Result.GetResult<Prisma.$ContatoParceiroPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContatoParceiro that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoParceiroFindFirstOrThrowArgs} args - Arguments to find a ContatoParceiro
     * @example
     * // Get one ContatoParceiro
     * const contatoParceiro = await prisma.contatoParceiro.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContatoParceiroFindFirstOrThrowArgs>(args?: SelectSubset<T, ContatoParceiroFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContatoParceiroClient<$Result.GetResult<Prisma.$ContatoParceiroPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContatoParceiros that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoParceiroFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContatoParceiros
     * const contatoParceiros = await prisma.contatoParceiro.findMany()
     * 
     * // Get first 10 ContatoParceiros
     * const contatoParceiros = await prisma.contatoParceiro.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contatoParceiroWithIdOnly = await prisma.contatoParceiro.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContatoParceiroFindManyArgs>(args?: SelectSubset<T, ContatoParceiroFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContatoParceiroPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContatoParceiro.
     * @param {ContatoParceiroCreateArgs} args - Arguments to create a ContatoParceiro.
     * @example
     * // Create one ContatoParceiro
     * const ContatoParceiro = await prisma.contatoParceiro.create({
     *   data: {
     *     // ... data to create a ContatoParceiro
     *   }
     * })
     * 
     */
    create<T extends ContatoParceiroCreateArgs>(args: SelectSubset<T, ContatoParceiroCreateArgs<ExtArgs>>): Prisma__ContatoParceiroClient<$Result.GetResult<Prisma.$ContatoParceiroPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContatoParceiros.
     * @param {ContatoParceiroCreateManyArgs} args - Arguments to create many ContatoParceiros.
     * @example
     * // Create many ContatoParceiros
     * const contatoParceiro = await prisma.contatoParceiro.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContatoParceiroCreateManyArgs>(args?: SelectSubset<T, ContatoParceiroCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContatoParceiros and returns the data saved in the database.
     * @param {ContatoParceiroCreateManyAndReturnArgs} args - Arguments to create many ContatoParceiros.
     * @example
     * // Create many ContatoParceiros
     * const contatoParceiro = await prisma.contatoParceiro.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContatoParceiros and only return the `id`
     * const contatoParceiroWithIdOnly = await prisma.contatoParceiro.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContatoParceiroCreateManyAndReturnArgs>(args?: SelectSubset<T, ContatoParceiroCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContatoParceiroPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ContatoParceiro.
     * @param {ContatoParceiroDeleteArgs} args - Arguments to delete one ContatoParceiro.
     * @example
     * // Delete one ContatoParceiro
     * const ContatoParceiro = await prisma.contatoParceiro.delete({
     *   where: {
     *     // ... filter to delete one ContatoParceiro
     *   }
     * })
     * 
     */
    delete<T extends ContatoParceiroDeleteArgs>(args: SelectSubset<T, ContatoParceiroDeleteArgs<ExtArgs>>): Prisma__ContatoParceiroClient<$Result.GetResult<Prisma.$ContatoParceiroPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContatoParceiro.
     * @param {ContatoParceiroUpdateArgs} args - Arguments to update one ContatoParceiro.
     * @example
     * // Update one ContatoParceiro
     * const contatoParceiro = await prisma.contatoParceiro.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContatoParceiroUpdateArgs>(args: SelectSubset<T, ContatoParceiroUpdateArgs<ExtArgs>>): Prisma__ContatoParceiroClient<$Result.GetResult<Prisma.$ContatoParceiroPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContatoParceiros.
     * @param {ContatoParceiroDeleteManyArgs} args - Arguments to filter ContatoParceiros to delete.
     * @example
     * // Delete a few ContatoParceiros
     * const { count } = await prisma.contatoParceiro.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContatoParceiroDeleteManyArgs>(args?: SelectSubset<T, ContatoParceiroDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContatoParceiros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoParceiroUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContatoParceiros
     * const contatoParceiro = await prisma.contatoParceiro.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContatoParceiroUpdateManyArgs>(args: SelectSubset<T, ContatoParceiroUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContatoParceiros and returns the data updated in the database.
     * @param {ContatoParceiroUpdateManyAndReturnArgs} args - Arguments to update many ContatoParceiros.
     * @example
     * // Update many ContatoParceiros
     * const contatoParceiro = await prisma.contatoParceiro.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ContatoParceiros and only return the `id`
     * const contatoParceiroWithIdOnly = await prisma.contatoParceiro.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContatoParceiroUpdateManyAndReturnArgs>(args: SelectSubset<T, ContatoParceiroUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContatoParceiroPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ContatoParceiro.
     * @param {ContatoParceiroUpsertArgs} args - Arguments to update or create a ContatoParceiro.
     * @example
     * // Update or create a ContatoParceiro
     * const contatoParceiro = await prisma.contatoParceiro.upsert({
     *   create: {
     *     // ... data to create a ContatoParceiro
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContatoParceiro we want to update
     *   }
     * })
     */
    upsert<T extends ContatoParceiroUpsertArgs>(args: SelectSubset<T, ContatoParceiroUpsertArgs<ExtArgs>>): Prisma__ContatoParceiroClient<$Result.GetResult<Prisma.$ContatoParceiroPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ContatoParceiros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoParceiroCountArgs} args - Arguments to filter ContatoParceiros to count.
     * @example
     * // Count the number of ContatoParceiros
     * const count = await prisma.contatoParceiro.count({
     *   where: {
     *     // ... the filter for the ContatoParceiros we want to count
     *   }
     * })
    **/
    count<T extends ContatoParceiroCountArgs>(
      args?: Subset<T, ContatoParceiroCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContatoParceiroCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContatoParceiro.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoParceiroAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContatoParceiroAggregateArgs>(args: Subset<T, ContatoParceiroAggregateArgs>): Prisma.PrismaPromise<GetContatoParceiroAggregateType<T>>

    /**
     * Group by ContatoParceiro.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoParceiroGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContatoParceiroGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContatoParceiroGroupByArgs['orderBy'] }
        : { orderBy?: ContatoParceiroGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContatoParceiroGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContatoParceiroGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContatoParceiro model
   */
  readonly fields: ContatoParceiroFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContatoParceiro.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContatoParceiroClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parceiro<T extends ParceiroDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ParceiroDefaultArgs<ExtArgs>>): Prisma__ParceiroClient<$Result.GetResult<Prisma.$ParceiroPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    mensagens<T extends ContatoParceiro$mensagensArgs<ExtArgs> = {}>(args?: Subset<T, ContatoParceiro$mensagensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContatoParceiro model
   */
  interface ContatoParceiroFieldRefs {
    readonly id: FieldRef<"ContatoParceiro", 'String'>
    readonly parceiroId: FieldRef<"ContatoParceiro", 'String'>
    readonly nome: FieldRef<"ContatoParceiro", 'String'>
    readonly telefoneWhatsapp: FieldRef<"ContatoParceiro", 'String'>
    readonly email: FieldRef<"ContatoParceiro", 'String'>
    readonly cargo: FieldRef<"ContatoParceiro", 'String'>
    readonly ordemEscalonamento: FieldRef<"ContatoParceiro", 'Int'>
    readonly createdAt: FieldRef<"ContatoParceiro", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContatoParceiro findUnique
   */
  export type ContatoParceiroFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContatoParceiro
     */
    select?: ContatoParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContatoParceiro
     */
    omit?: ContatoParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoParceiroInclude<ExtArgs> | null
    /**
     * Filter, which ContatoParceiro to fetch.
     */
    where: ContatoParceiroWhereUniqueInput
  }

  /**
   * ContatoParceiro findUniqueOrThrow
   */
  export type ContatoParceiroFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContatoParceiro
     */
    select?: ContatoParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContatoParceiro
     */
    omit?: ContatoParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoParceiroInclude<ExtArgs> | null
    /**
     * Filter, which ContatoParceiro to fetch.
     */
    where: ContatoParceiroWhereUniqueInput
  }

  /**
   * ContatoParceiro findFirst
   */
  export type ContatoParceiroFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContatoParceiro
     */
    select?: ContatoParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContatoParceiro
     */
    omit?: ContatoParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoParceiroInclude<ExtArgs> | null
    /**
     * Filter, which ContatoParceiro to fetch.
     */
    where?: ContatoParceiroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContatoParceiros to fetch.
     */
    orderBy?: ContatoParceiroOrderByWithRelationInput | ContatoParceiroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContatoParceiros.
     */
    cursor?: ContatoParceiroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContatoParceiros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContatoParceiros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContatoParceiros.
     */
    distinct?: ContatoParceiroScalarFieldEnum | ContatoParceiroScalarFieldEnum[]
  }

  /**
   * ContatoParceiro findFirstOrThrow
   */
  export type ContatoParceiroFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContatoParceiro
     */
    select?: ContatoParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContatoParceiro
     */
    omit?: ContatoParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoParceiroInclude<ExtArgs> | null
    /**
     * Filter, which ContatoParceiro to fetch.
     */
    where?: ContatoParceiroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContatoParceiros to fetch.
     */
    orderBy?: ContatoParceiroOrderByWithRelationInput | ContatoParceiroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContatoParceiros.
     */
    cursor?: ContatoParceiroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContatoParceiros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContatoParceiros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContatoParceiros.
     */
    distinct?: ContatoParceiroScalarFieldEnum | ContatoParceiroScalarFieldEnum[]
  }

  /**
   * ContatoParceiro findMany
   */
  export type ContatoParceiroFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContatoParceiro
     */
    select?: ContatoParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContatoParceiro
     */
    omit?: ContatoParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoParceiroInclude<ExtArgs> | null
    /**
     * Filter, which ContatoParceiros to fetch.
     */
    where?: ContatoParceiroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContatoParceiros to fetch.
     */
    orderBy?: ContatoParceiroOrderByWithRelationInput | ContatoParceiroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContatoParceiros.
     */
    cursor?: ContatoParceiroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContatoParceiros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContatoParceiros.
     */
    skip?: number
    distinct?: ContatoParceiroScalarFieldEnum | ContatoParceiroScalarFieldEnum[]
  }

  /**
   * ContatoParceiro create
   */
  export type ContatoParceiroCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContatoParceiro
     */
    select?: ContatoParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContatoParceiro
     */
    omit?: ContatoParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoParceiroInclude<ExtArgs> | null
    /**
     * The data needed to create a ContatoParceiro.
     */
    data: XOR<ContatoParceiroCreateInput, ContatoParceiroUncheckedCreateInput>
  }

  /**
   * ContatoParceiro createMany
   */
  export type ContatoParceiroCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContatoParceiros.
     */
    data: ContatoParceiroCreateManyInput | ContatoParceiroCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContatoParceiro createManyAndReturn
   */
  export type ContatoParceiroCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContatoParceiro
     */
    select?: ContatoParceiroSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContatoParceiro
     */
    omit?: ContatoParceiroOmit<ExtArgs> | null
    /**
     * The data used to create many ContatoParceiros.
     */
    data: ContatoParceiroCreateManyInput | ContatoParceiroCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoParceiroIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContatoParceiro update
   */
  export type ContatoParceiroUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContatoParceiro
     */
    select?: ContatoParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContatoParceiro
     */
    omit?: ContatoParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoParceiroInclude<ExtArgs> | null
    /**
     * The data needed to update a ContatoParceiro.
     */
    data: XOR<ContatoParceiroUpdateInput, ContatoParceiroUncheckedUpdateInput>
    /**
     * Choose, which ContatoParceiro to update.
     */
    where: ContatoParceiroWhereUniqueInput
  }

  /**
   * ContatoParceiro updateMany
   */
  export type ContatoParceiroUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContatoParceiros.
     */
    data: XOR<ContatoParceiroUpdateManyMutationInput, ContatoParceiroUncheckedUpdateManyInput>
    /**
     * Filter which ContatoParceiros to update
     */
    where?: ContatoParceiroWhereInput
    /**
     * Limit how many ContatoParceiros to update.
     */
    limit?: number
  }

  /**
   * ContatoParceiro updateManyAndReturn
   */
  export type ContatoParceiroUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContatoParceiro
     */
    select?: ContatoParceiroSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContatoParceiro
     */
    omit?: ContatoParceiroOmit<ExtArgs> | null
    /**
     * The data used to update ContatoParceiros.
     */
    data: XOR<ContatoParceiroUpdateManyMutationInput, ContatoParceiroUncheckedUpdateManyInput>
    /**
     * Filter which ContatoParceiros to update
     */
    where?: ContatoParceiroWhereInput
    /**
     * Limit how many ContatoParceiros to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoParceiroIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContatoParceiro upsert
   */
  export type ContatoParceiroUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContatoParceiro
     */
    select?: ContatoParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContatoParceiro
     */
    omit?: ContatoParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoParceiroInclude<ExtArgs> | null
    /**
     * The filter to search for the ContatoParceiro to update in case it exists.
     */
    where: ContatoParceiroWhereUniqueInput
    /**
     * In case the ContatoParceiro found by the `where` argument doesn't exist, create a new ContatoParceiro with this data.
     */
    create: XOR<ContatoParceiroCreateInput, ContatoParceiroUncheckedCreateInput>
    /**
     * In case the ContatoParceiro was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContatoParceiroUpdateInput, ContatoParceiroUncheckedUpdateInput>
  }

  /**
   * ContatoParceiro delete
   */
  export type ContatoParceiroDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContatoParceiro
     */
    select?: ContatoParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContatoParceiro
     */
    omit?: ContatoParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoParceiroInclude<ExtArgs> | null
    /**
     * Filter which ContatoParceiro to delete.
     */
    where: ContatoParceiroWhereUniqueInput
  }

  /**
   * ContatoParceiro deleteMany
   */
  export type ContatoParceiroDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContatoParceiros to delete
     */
    where?: ContatoParceiroWhereInput
    /**
     * Limit how many ContatoParceiros to delete.
     */
    limit?: number
  }

  /**
   * ContatoParceiro.mensagens
   */
  export type ContatoParceiro$mensagensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagem
     */
    omit?: MensagemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    where?: MensagemWhereInput
    orderBy?: MensagemOrderByWithRelationInput | MensagemOrderByWithRelationInput[]
    cursor?: MensagemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MensagemScalarFieldEnum | MensagemScalarFieldEnum[]
  }

  /**
   * ContatoParceiro without action
   */
  export type ContatoParceiroDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContatoParceiro
     */
    select?: ContatoParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContatoParceiro
     */
    omit?: ContatoParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoParceiroInclude<ExtArgs> | null
  }


  /**
   * Model Importacao
   */

  export type AggregateImportacao = {
    _count: ImportacaoCountAggregateOutputType | null
    _avg: ImportacaoAvgAggregateOutputType | null
    _sum: ImportacaoSumAggregateOutputType | null
    _min: ImportacaoMinAggregateOutputType | null
    _max: ImportacaoMaxAggregateOutputType | null
  }

  export type ImportacaoAvgAggregateOutputType = {
    totalRegistros: number | null
    registrosImportados: number | null
    registrosIgnorados: number | null
  }

  export type ImportacaoSumAggregateOutputType = {
    totalRegistros: number | null
    registrosImportados: number | null
    registrosIgnorados: number | null
  }

  export type ImportacaoMinAggregateOutputType = {
    id: string | null
    nomeArquivo: string | null
    totalRegistros: number | null
    registrosImportados: number | null
    registrosIgnorados: number | null
    status: $Enums.StatusImportacao | null
    createdAt: Date | null
  }

  export type ImportacaoMaxAggregateOutputType = {
    id: string | null
    nomeArquivo: string | null
    totalRegistros: number | null
    registrosImportados: number | null
    registrosIgnorados: number | null
    status: $Enums.StatusImportacao | null
    createdAt: Date | null
  }

  export type ImportacaoCountAggregateOutputType = {
    id: number
    nomeArquivo: number
    totalRegistros: number
    registrosImportados: number
    registrosIgnorados: number
    mapeamentoColunas: number
    status: number
    erros: number
    createdAt: number
    _all: number
  }


  export type ImportacaoAvgAggregateInputType = {
    totalRegistros?: true
    registrosImportados?: true
    registrosIgnorados?: true
  }

  export type ImportacaoSumAggregateInputType = {
    totalRegistros?: true
    registrosImportados?: true
    registrosIgnorados?: true
  }

  export type ImportacaoMinAggregateInputType = {
    id?: true
    nomeArquivo?: true
    totalRegistros?: true
    registrosImportados?: true
    registrosIgnorados?: true
    status?: true
    createdAt?: true
  }

  export type ImportacaoMaxAggregateInputType = {
    id?: true
    nomeArquivo?: true
    totalRegistros?: true
    registrosImportados?: true
    registrosIgnorados?: true
    status?: true
    createdAt?: true
  }

  export type ImportacaoCountAggregateInputType = {
    id?: true
    nomeArquivo?: true
    totalRegistros?: true
    registrosImportados?: true
    registrosIgnorados?: true
    mapeamentoColunas?: true
    status?: true
    erros?: true
    createdAt?: true
    _all?: true
  }

  export type ImportacaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Importacao to aggregate.
     */
    where?: ImportacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Importacaos to fetch.
     */
    orderBy?: ImportacaoOrderByWithRelationInput | ImportacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImportacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Importacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Importacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Importacaos
    **/
    _count?: true | ImportacaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ImportacaoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ImportacaoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImportacaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImportacaoMaxAggregateInputType
  }

  export type GetImportacaoAggregateType<T extends ImportacaoAggregateArgs> = {
        [P in keyof T & keyof AggregateImportacao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImportacao[P]>
      : GetScalarType<T[P], AggregateImportacao[P]>
  }




  export type ImportacaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImportacaoWhereInput
    orderBy?: ImportacaoOrderByWithAggregationInput | ImportacaoOrderByWithAggregationInput[]
    by: ImportacaoScalarFieldEnum[] | ImportacaoScalarFieldEnum
    having?: ImportacaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImportacaoCountAggregateInputType | true
    _avg?: ImportacaoAvgAggregateInputType
    _sum?: ImportacaoSumAggregateInputType
    _min?: ImportacaoMinAggregateInputType
    _max?: ImportacaoMaxAggregateInputType
  }

  export type ImportacaoGroupByOutputType = {
    id: string
    nomeArquivo: string
    totalRegistros: number
    registrosImportados: number
    registrosIgnorados: number
    mapeamentoColunas: JsonValue | null
    status: $Enums.StatusImportacao
    erros: JsonValue | null
    createdAt: Date
    _count: ImportacaoCountAggregateOutputType | null
    _avg: ImportacaoAvgAggregateOutputType | null
    _sum: ImportacaoSumAggregateOutputType | null
    _min: ImportacaoMinAggregateOutputType | null
    _max: ImportacaoMaxAggregateOutputType | null
  }

  type GetImportacaoGroupByPayload<T extends ImportacaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImportacaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImportacaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImportacaoGroupByOutputType[P]>
            : GetScalarType<T[P], ImportacaoGroupByOutputType[P]>
        }
      >
    >


  export type ImportacaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nomeArquivo?: boolean
    totalRegistros?: boolean
    registrosImportados?: boolean
    registrosIgnorados?: boolean
    mapeamentoColunas?: boolean
    status?: boolean
    erros?: boolean
    createdAt?: boolean
    audiencias?: boolean | Importacao$audienciasArgs<ExtArgs>
    _count?: boolean | ImportacaoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["importacao"]>

  export type ImportacaoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nomeArquivo?: boolean
    totalRegistros?: boolean
    registrosImportados?: boolean
    registrosIgnorados?: boolean
    mapeamentoColunas?: boolean
    status?: boolean
    erros?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["importacao"]>

  export type ImportacaoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nomeArquivo?: boolean
    totalRegistros?: boolean
    registrosImportados?: boolean
    registrosIgnorados?: boolean
    mapeamentoColunas?: boolean
    status?: boolean
    erros?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["importacao"]>

  export type ImportacaoSelectScalar = {
    id?: boolean
    nomeArquivo?: boolean
    totalRegistros?: boolean
    registrosImportados?: boolean
    registrosIgnorados?: boolean
    mapeamentoColunas?: boolean
    status?: boolean
    erros?: boolean
    createdAt?: boolean
  }

  export type ImportacaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nomeArquivo" | "totalRegistros" | "registrosImportados" | "registrosIgnorados" | "mapeamentoColunas" | "status" | "erros" | "createdAt", ExtArgs["result"]["importacao"]>
  export type ImportacaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audiencias?: boolean | Importacao$audienciasArgs<ExtArgs>
    _count?: boolean | ImportacaoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ImportacaoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ImportacaoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ImportacaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Importacao"
    objects: {
      audiencias: Prisma.$AudienciaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nomeArquivo: string
      totalRegistros: number
      registrosImportados: number
      registrosIgnorados: number
      mapeamentoColunas: Prisma.JsonValue | null
      status: $Enums.StatusImportacao
      erros: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["importacao"]>
    composites: {}
  }

  type ImportacaoGetPayload<S extends boolean | null | undefined | ImportacaoDefaultArgs> = $Result.GetResult<Prisma.$ImportacaoPayload, S>

  type ImportacaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ImportacaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ImportacaoCountAggregateInputType | true
    }

  export interface ImportacaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Importacao'], meta: { name: 'Importacao' } }
    /**
     * Find zero or one Importacao that matches the filter.
     * @param {ImportacaoFindUniqueArgs} args - Arguments to find a Importacao
     * @example
     * // Get one Importacao
     * const importacao = await prisma.importacao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ImportacaoFindUniqueArgs>(args: SelectSubset<T, ImportacaoFindUniqueArgs<ExtArgs>>): Prisma__ImportacaoClient<$Result.GetResult<Prisma.$ImportacaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Importacao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ImportacaoFindUniqueOrThrowArgs} args - Arguments to find a Importacao
     * @example
     * // Get one Importacao
     * const importacao = await prisma.importacao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ImportacaoFindUniqueOrThrowArgs>(args: SelectSubset<T, ImportacaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ImportacaoClient<$Result.GetResult<Prisma.$ImportacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Importacao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportacaoFindFirstArgs} args - Arguments to find a Importacao
     * @example
     * // Get one Importacao
     * const importacao = await prisma.importacao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ImportacaoFindFirstArgs>(args?: SelectSubset<T, ImportacaoFindFirstArgs<ExtArgs>>): Prisma__ImportacaoClient<$Result.GetResult<Prisma.$ImportacaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Importacao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportacaoFindFirstOrThrowArgs} args - Arguments to find a Importacao
     * @example
     * // Get one Importacao
     * const importacao = await prisma.importacao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ImportacaoFindFirstOrThrowArgs>(args?: SelectSubset<T, ImportacaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ImportacaoClient<$Result.GetResult<Prisma.$ImportacaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Importacaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportacaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Importacaos
     * const importacaos = await prisma.importacao.findMany()
     * 
     * // Get first 10 Importacaos
     * const importacaos = await prisma.importacao.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const importacaoWithIdOnly = await prisma.importacao.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ImportacaoFindManyArgs>(args?: SelectSubset<T, ImportacaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Importacao.
     * @param {ImportacaoCreateArgs} args - Arguments to create a Importacao.
     * @example
     * // Create one Importacao
     * const Importacao = await prisma.importacao.create({
     *   data: {
     *     // ... data to create a Importacao
     *   }
     * })
     * 
     */
    create<T extends ImportacaoCreateArgs>(args: SelectSubset<T, ImportacaoCreateArgs<ExtArgs>>): Prisma__ImportacaoClient<$Result.GetResult<Prisma.$ImportacaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Importacaos.
     * @param {ImportacaoCreateManyArgs} args - Arguments to create many Importacaos.
     * @example
     * // Create many Importacaos
     * const importacao = await prisma.importacao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ImportacaoCreateManyArgs>(args?: SelectSubset<T, ImportacaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Importacaos and returns the data saved in the database.
     * @param {ImportacaoCreateManyAndReturnArgs} args - Arguments to create many Importacaos.
     * @example
     * // Create many Importacaos
     * const importacao = await prisma.importacao.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Importacaos and only return the `id`
     * const importacaoWithIdOnly = await prisma.importacao.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ImportacaoCreateManyAndReturnArgs>(args?: SelectSubset<T, ImportacaoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportacaoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Importacao.
     * @param {ImportacaoDeleteArgs} args - Arguments to delete one Importacao.
     * @example
     * // Delete one Importacao
     * const Importacao = await prisma.importacao.delete({
     *   where: {
     *     // ... filter to delete one Importacao
     *   }
     * })
     * 
     */
    delete<T extends ImportacaoDeleteArgs>(args: SelectSubset<T, ImportacaoDeleteArgs<ExtArgs>>): Prisma__ImportacaoClient<$Result.GetResult<Prisma.$ImportacaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Importacao.
     * @param {ImportacaoUpdateArgs} args - Arguments to update one Importacao.
     * @example
     * // Update one Importacao
     * const importacao = await prisma.importacao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ImportacaoUpdateArgs>(args: SelectSubset<T, ImportacaoUpdateArgs<ExtArgs>>): Prisma__ImportacaoClient<$Result.GetResult<Prisma.$ImportacaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Importacaos.
     * @param {ImportacaoDeleteManyArgs} args - Arguments to filter Importacaos to delete.
     * @example
     * // Delete a few Importacaos
     * const { count } = await prisma.importacao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ImportacaoDeleteManyArgs>(args?: SelectSubset<T, ImportacaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Importacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportacaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Importacaos
     * const importacao = await prisma.importacao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ImportacaoUpdateManyArgs>(args: SelectSubset<T, ImportacaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Importacaos and returns the data updated in the database.
     * @param {ImportacaoUpdateManyAndReturnArgs} args - Arguments to update many Importacaos.
     * @example
     * // Update many Importacaos
     * const importacao = await prisma.importacao.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Importacaos and only return the `id`
     * const importacaoWithIdOnly = await prisma.importacao.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ImportacaoUpdateManyAndReturnArgs>(args: SelectSubset<T, ImportacaoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportacaoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Importacao.
     * @param {ImportacaoUpsertArgs} args - Arguments to update or create a Importacao.
     * @example
     * // Update or create a Importacao
     * const importacao = await prisma.importacao.upsert({
     *   create: {
     *     // ... data to create a Importacao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Importacao we want to update
     *   }
     * })
     */
    upsert<T extends ImportacaoUpsertArgs>(args: SelectSubset<T, ImportacaoUpsertArgs<ExtArgs>>): Prisma__ImportacaoClient<$Result.GetResult<Prisma.$ImportacaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Importacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportacaoCountArgs} args - Arguments to filter Importacaos to count.
     * @example
     * // Count the number of Importacaos
     * const count = await prisma.importacao.count({
     *   where: {
     *     // ... the filter for the Importacaos we want to count
     *   }
     * })
    **/
    count<T extends ImportacaoCountArgs>(
      args?: Subset<T, ImportacaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImportacaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Importacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportacaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImportacaoAggregateArgs>(args: Subset<T, ImportacaoAggregateArgs>): Prisma.PrismaPromise<GetImportacaoAggregateType<T>>

    /**
     * Group by Importacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportacaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ImportacaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImportacaoGroupByArgs['orderBy'] }
        : { orderBy?: ImportacaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ImportacaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImportacaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Importacao model
   */
  readonly fields: ImportacaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Importacao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ImportacaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    audiencias<T extends Importacao$audienciasArgs<ExtArgs> = {}>(args?: Subset<T, Importacao$audienciasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AudienciaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Importacao model
   */
  interface ImportacaoFieldRefs {
    readonly id: FieldRef<"Importacao", 'String'>
    readonly nomeArquivo: FieldRef<"Importacao", 'String'>
    readonly totalRegistros: FieldRef<"Importacao", 'Int'>
    readonly registrosImportados: FieldRef<"Importacao", 'Int'>
    readonly registrosIgnorados: FieldRef<"Importacao", 'Int'>
    readonly mapeamentoColunas: FieldRef<"Importacao", 'Json'>
    readonly status: FieldRef<"Importacao", 'StatusImportacao'>
    readonly erros: FieldRef<"Importacao", 'Json'>
    readonly createdAt: FieldRef<"Importacao", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Importacao findUnique
   */
  export type ImportacaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Importacao
     */
    select?: ImportacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Importacao
     */
    omit?: ImportacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportacaoInclude<ExtArgs> | null
    /**
     * Filter, which Importacao to fetch.
     */
    where: ImportacaoWhereUniqueInput
  }

  /**
   * Importacao findUniqueOrThrow
   */
  export type ImportacaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Importacao
     */
    select?: ImportacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Importacao
     */
    omit?: ImportacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportacaoInclude<ExtArgs> | null
    /**
     * Filter, which Importacao to fetch.
     */
    where: ImportacaoWhereUniqueInput
  }

  /**
   * Importacao findFirst
   */
  export type ImportacaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Importacao
     */
    select?: ImportacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Importacao
     */
    omit?: ImportacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportacaoInclude<ExtArgs> | null
    /**
     * Filter, which Importacao to fetch.
     */
    where?: ImportacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Importacaos to fetch.
     */
    orderBy?: ImportacaoOrderByWithRelationInput | ImportacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Importacaos.
     */
    cursor?: ImportacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Importacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Importacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Importacaos.
     */
    distinct?: ImportacaoScalarFieldEnum | ImportacaoScalarFieldEnum[]
  }

  /**
   * Importacao findFirstOrThrow
   */
  export type ImportacaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Importacao
     */
    select?: ImportacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Importacao
     */
    omit?: ImportacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportacaoInclude<ExtArgs> | null
    /**
     * Filter, which Importacao to fetch.
     */
    where?: ImportacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Importacaos to fetch.
     */
    orderBy?: ImportacaoOrderByWithRelationInput | ImportacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Importacaos.
     */
    cursor?: ImportacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Importacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Importacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Importacaos.
     */
    distinct?: ImportacaoScalarFieldEnum | ImportacaoScalarFieldEnum[]
  }

  /**
   * Importacao findMany
   */
  export type ImportacaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Importacao
     */
    select?: ImportacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Importacao
     */
    omit?: ImportacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportacaoInclude<ExtArgs> | null
    /**
     * Filter, which Importacaos to fetch.
     */
    where?: ImportacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Importacaos to fetch.
     */
    orderBy?: ImportacaoOrderByWithRelationInput | ImportacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Importacaos.
     */
    cursor?: ImportacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Importacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Importacaos.
     */
    skip?: number
    distinct?: ImportacaoScalarFieldEnum | ImportacaoScalarFieldEnum[]
  }

  /**
   * Importacao create
   */
  export type ImportacaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Importacao
     */
    select?: ImportacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Importacao
     */
    omit?: ImportacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportacaoInclude<ExtArgs> | null
    /**
     * The data needed to create a Importacao.
     */
    data: XOR<ImportacaoCreateInput, ImportacaoUncheckedCreateInput>
  }

  /**
   * Importacao createMany
   */
  export type ImportacaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Importacaos.
     */
    data: ImportacaoCreateManyInput | ImportacaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Importacao createManyAndReturn
   */
  export type ImportacaoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Importacao
     */
    select?: ImportacaoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Importacao
     */
    omit?: ImportacaoOmit<ExtArgs> | null
    /**
     * The data used to create many Importacaos.
     */
    data: ImportacaoCreateManyInput | ImportacaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Importacao update
   */
  export type ImportacaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Importacao
     */
    select?: ImportacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Importacao
     */
    omit?: ImportacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportacaoInclude<ExtArgs> | null
    /**
     * The data needed to update a Importacao.
     */
    data: XOR<ImportacaoUpdateInput, ImportacaoUncheckedUpdateInput>
    /**
     * Choose, which Importacao to update.
     */
    where: ImportacaoWhereUniqueInput
  }

  /**
   * Importacao updateMany
   */
  export type ImportacaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Importacaos.
     */
    data: XOR<ImportacaoUpdateManyMutationInput, ImportacaoUncheckedUpdateManyInput>
    /**
     * Filter which Importacaos to update
     */
    where?: ImportacaoWhereInput
    /**
     * Limit how many Importacaos to update.
     */
    limit?: number
  }

  /**
   * Importacao updateManyAndReturn
   */
  export type ImportacaoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Importacao
     */
    select?: ImportacaoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Importacao
     */
    omit?: ImportacaoOmit<ExtArgs> | null
    /**
     * The data used to update Importacaos.
     */
    data: XOR<ImportacaoUpdateManyMutationInput, ImportacaoUncheckedUpdateManyInput>
    /**
     * Filter which Importacaos to update
     */
    where?: ImportacaoWhereInput
    /**
     * Limit how many Importacaos to update.
     */
    limit?: number
  }

  /**
   * Importacao upsert
   */
  export type ImportacaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Importacao
     */
    select?: ImportacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Importacao
     */
    omit?: ImportacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportacaoInclude<ExtArgs> | null
    /**
     * The filter to search for the Importacao to update in case it exists.
     */
    where: ImportacaoWhereUniqueInput
    /**
     * In case the Importacao found by the `where` argument doesn't exist, create a new Importacao with this data.
     */
    create: XOR<ImportacaoCreateInput, ImportacaoUncheckedCreateInput>
    /**
     * In case the Importacao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImportacaoUpdateInput, ImportacaoUncheckedUpdateInput>
  }

  /**
   * Importacao delete
   */
  export type ImportacaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Importacao
     */
    select?: ImportacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Importacao
     */
    omit?: ImportacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportacaoInclude<ExtArgs> | null
    /**
     * Filter which Importacao to delete.
     */
    where: ImportacaoWhereUniqueInput
  }

  /**
   * Importacao deleteMany
   */
  export type ImportacaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Importacaos to delete
     */
    where?: ImportacaoWhereInput
    /**
     * Limit how many Importacaos to delete.
     */
    limit?: number
  }

  /**
   * Importacao.audiencias
   */
  export type Importacao$audienciasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audiencia
     */
    select?: AudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Audiencia
     */
    omit?: AudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudienciaInclude<ExtArgs> | null
    where?: AudienciaWhereInput
    orderBy?: AudienciaOrderByWithRelationInput | AudienciaOrderByWithRelationInput[]
    cursor?: AudienciaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AudienciaScalarFieldEnum | AudienciaScalarFieldEnum[]
  }

  /**
   * Importacao without action
   */
  export type ImportacaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Importacao
     */
    select?: ImportacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Importacao
     */
    omit?: ImportacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportacaoInclude<ExtArgs> | null
  }


  /**
   * Model Audiencia
   */

  export type AggregateAudiencia = {
    _count: AudienciaCountAggregateOutputType | null
    _min: AudienciaMinAggregateOutputType | null
    _max: AudienciaMaxAggregateOutputType | null
  }

  export type AudienciaMinAggregateOutputType = {
    id: string | null
    numeroProcesso: string | null
    reclamante: string | null
    data: Date | null
    hora: string | null
    modalidade: $Enums.Modalidade | null
    local: string | null
    link: string | null
    trtId: string | null
    vara: string | null
    status: $Enums.StatusAudiencia | null
    prepostoId: string | null
    parceiroId: string | null
    importacaoId: string | null
    observacoes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AudienciaMaxAggregateOutputType = {
    id: string | null
    numeroProcesso: string | null
    reclamante: string | null
    data: Date | null
    hora: string | null
    modalidade: $Enums.Modalidade | null
    local: string | null
    link: string | null
    trtId: string | null
    vara: string | null
    status: $Enums.StatusAudiencia | null
    prepostoId: string | null
    parceiroId: string | null
    importacaoId: string | null
    observacoes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AudienciaCountAggregateOutputType = {
    id: number
    numeroProcesso: number
    reclamante: number
    data: number
    hora: number
    modalidade: number
    local: number
    link: number
    trtId: number
    vara: number
    status: number
    prepostoId: number
    parceiroId: number
    importacaoId: number
    observacoes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AudienciaMinAggregateInputType = {
    id?: true
    numeroProcesso?: true
    reclamante?: true
    data?: true
    hora?: true
    modalidade?: true
    local?: true
    link?: true
    trtId?: true
    vara?: true
    status?: true
    prepostoId?: true
    parceiroId?: true
    importacaoId?: true
    observacoes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AudienciaMaxAggregateInputType = {
    id?: true
    numeroProcesso?: true
    reclamante?: true
    data?: true
    hora?: true
    modalidade?: true
    local?: true
    link?: true
    trtId?: true
    vara?: true
    status?: true
    prepostoId?: true
    parceiroId?: true
    importacaoId?: true
    observacoes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AudienciaCountAggregateInputType = {
    id?: true
    numeroProcesso?: true
    reclamante?: true
    data?: true
    hora?: true
    modalidade?: true
    local?: true
    link?: true
    trtId?: true
    vara?: true
    status?: true
    prepostoId?: true
    parceiroId?: true
    importacaoId?: true
    observacoes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AudienciaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Audiencia to aggregate.
     */
    where?: AudienciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Audiencias to fetch.
     */
    orderBy?: AudienciaOrderByWithRelationInput | AudienciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AudienciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Audiencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Audiencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Audiencias
    **/
    _count?: true | AudienciaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AudienciaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AudienciaMaxAggregateInputType
  }

  export type GetAudienciaAggregateType<T extends AudienciaAggregateArgs> = {
        [P in keyof T & keyof AggregateAudiencia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAudiencia[P]>
      : GetScalarType<T[P], AggregateAudiencia[P]>
  }




  export type AudienciaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AudienciaWhereInput
    orderBy?: AudienciaOrderByWithAggregationInput | AudienciaOrderByWithAggregationInput[]
    by: AudienciaScalarFieldEnum[] | AudienciaScalarFieldEnum
    having?: AudienciaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AudienciaCountAggregateInputType | true
    _min?: AudienciaMinAggregateInputType
    _max?: AudienciaMaxAggregateInputType
  }

  export type AudienciaGroupByOutputType = {
    id: string
    numeroProcesso: string
    reclamante: string | null
    data: Date
    hora: string
    modalidade: $Enums.Modalidade
    local: string | null
    link: string | null
    trtId: string
    vara: string | null
    status: $Enums.StatusAudiencia
    prepostoId: string
    parceiroId: string
    importacaoId: string | null
    observacoes: string | null
    createdAt: Date
    updatedAt: Date
    _count: AudienciaCountAggregateOutputType | null
    _min: AudienciaMinAggregateOutputType | null
    _max: AudienciaMaxAggregateOutputType | null
  }

  type GetAudienciaGroupByPayload<T extends AudienciaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AudienciaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AudienciaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AudienciaGroupByOutputType[P]>
            : GetScalarType<T[P], AudienciaGroupByOutputType[P]>
        }
      >
    >


  export type AudienciaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numeroProcesso?: boolean
    reclamante?: boolean
    data?: boolean
    hora?: boolean
    modalidade?: boolean
    local?: boolean
    link?: boolean
    trtId?: boolean
    vara?: boolean
    status?: boolean
    prepostoId?: boolean
    parceiroId?: boolean
    importacaoId?: boolean
    observacoes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trt?: boolean | TrtDefaultArgs<ExtArgs>
    preposto?: boolean | PrepostoDefaultArgs<ExtArgs>
    parceiro?: boolean | ParceiroDefaultArgs<ExtArgs>
    importacao?: boolean | Audiencia$importacaoArgs<ExtArgs>
    mensagens?: boolean | Audiencia$mensagensArgs<ExtArgs>
    historicoStatus?: boolean | Audiencia$historicoStatusArgs<ExtArgs>
    relatorio?: boolean | Audiencia$relatorioArgs<ExtArgs>
    substituicoes?: boolean | Audiencia$substituicoesArgs<ExtArgs>
    _count?: boolean | AudienciaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["audiencia"]>

  export type AudienciaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numeroProcesso?: boolean
    reclamante?: boolean
    data?: boolean
    hora?: boolean
    modalidade?: boolean
    local?: boolean
    link?: boolean
    trtId?: boolean
    vara?: boolean
    status?: boolean
    prepostoId?: boolean
    parceiroId?: boolean
    importacaoId?: boolean
    observacoes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trt?: boolean | TrtDefaultArgs<ExtArgs>
    preposto?: boolean | PrepostoDefaultArgs<ExtArgs>
    parceiro?: boolean | ParceiroDefaultArgs<ExtArgs>
    importacao?: boolean | Audiencia$importacaoArgs<ExtArgs>
  }, ExtArgs["result"]["audiencia"]>

  export type AudienciaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numeroProcesso?: boolean
    reclamante?: boolean
    data?: boolean
    hora?: boolean
    modalidade?: boolean
    local?: boolean
    link?: boolean
    trtId?: boolean
    vara?: boolean
    status?: boolean
    prepostoId?: boolean
    parceiroId?: boolean
    importacaoId?: boolean
    observacoes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trt?: boolean | TrtDefaultArgs<ExtArgs>
    preposto?: boolean | PrepostoDefaultArgs<ExtArgs>
    parceiro?: boolean | ParceiroDefaultArgs<ExtArgs>
    importacao?: boolean | Audiencia$importacaoArgs<ExtArgs>
  }, ExtArgs["result"]["audiencia"]>

  export type AudienciaSelectScalar = {
    id?: boolean
    numeroProcesso?: boolean
    reclamante?: boolean
    data?: boolean
    hora?: boolean
    modalidade?: boolean
    local?: boolean
    link?: boolean
    trtId?: boolean
    vara?: boolean
    status?: boolean
    prepostoId?: boolean
    parceiroId?: boolean
    importacaoId?: boolean
    observacoes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AudienciaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "numeroProcesso" | "reclamante" | "data" | "hora" | "modalidade" | "local" | "link" | "trtId" | "vara" | "status" | "prepostoId" | "parceiroId" | "importacaoId" | "observacoes" | "createdAt" | "updatedAt", ExtArgs["result"]["audiencia"]>
  export type AudienciaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trt?: boolean | TrtDefaultArgs<ExtArgs>
    preposto?: boolean | PrepostoDefaultArgs<ExtArgs>
    parceiro?: boolean | ParceiroDefaultArgs<ExtArgs>
    importacao?: boolean | Audiencia$importacaoArgs<ExtArgs>
    mensagens?: boolean | Audiencia$mensagensArgs<ExtArgs>
    historicoStatus?: boolean | Audiencia$historicoStatusArgs<ExtArgs>
    relatorio?: boolean | Audiencia$relatorioArgs<ExtArgs>
    substituicoes?: boolean | Audiencia$substituicoesArgs<ExtArgs>
    _count?: boolean | AudienciaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AudienciaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trt?: boolean | TrtDefaultArgs<ExtArgs>
    preposto?: boolean | PrepostoDefaultArgs<ExtArgs>
    parceiro?: boolean | ParceiroDefaultArgs<ExtArgs>
    importacao?: boolean | Audiencia$importacaoArgs<ExtArgs>
  }
  export type AudienciaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trt?: boolean | TrtDefaultArgs<ExtArgs>
    preposto?: boolean | PrepostoDefaultArgs<ExtArgs>
    parceiro?: boolean | ParceiroDefaultArgs<ExtArgs>
    importacao?: boolean | Audiencia$importacaoArgs<ExtArgs>
  }

  export type $AudienciaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Audiencia"
    objects: {
      trt: Prisma.$TrtPayload<ExtArgs>
      preposto: Prisma.$PrepostoPayload<ExtArgs>
      parceiro: Prisma.$ParceiroPayload<ExtArgs>
      importacao: Prisma.$ImportacaoPayload<ExtArgs> | null
      mensagens: Prisma.$MensagemPayload<ExtArgs>[]
      historicoStatus: Prisma.$HistoricoStatusPayload<ExtArgs>[]
      relatorio: Prisma.$RelatorioAudienciaPayload<ExtArgs> | null
      substituicoes: Prisma.$SubstituicaoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      numeroProcesso: string
      reclamante: string | null
      data: Date
      hora: string
      modalidade: $Enums.Modalidade
      local: string | null
      link: string | null
      trtId: string
      vara: string | null
      status: $Enums.StatusAudiencia
      prepostoId: string
      parceiroId: string
      importacaoId: string | null
      observacoes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["audiencia"]>
    composites: {}
  }

  type AudienciaGetPayload<S extends boolean | null | undefined | AudienciaDefaultArgs> = $Result.GetResult<Prisma.$AudienciaPayload, S>

  type AudienciaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AudienciaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AudienciaCountAggregateInputType | true
    }

  export interface AudienciaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Audiencia'], meta: { name: 'Audiencia' } }
    /**
     * Find zero or one Audiencia that matches the filter.
     * @param {AudienciaFindUniqueArgs} args - Arguments to find a Audiencia
     * @example
     * // Get one Audiencia
     * const audiencia = await prisma.audiencia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AudienciaFindUniqueArgs>(args: SelectSubset<T, AudienciaFindUniqueArgs<ExtArgs>>): Prisma__AudienciaClient<$Result.GetResult<Prisma.$AudienciaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Audiencia that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AudienciaFindUniqueOrThrowArgs} args - Arguments to find a Audiencia
     * @example
     * // Get one Audiencia
     * const audiencia = await prisma.audiencia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AudienciaFindUniqueOrThrowArgs>(args: SelectSubset<T, AudienciaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AudienciaClient<$Result.GetResult<Prisma.$AudienciaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Audiencia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudienciaFindFirstArgs} args - Arguments to find a Audiencia
     * @example
     * // Get one Audiencia
     * const audiencia = await prisma.audiencia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AudienciaFindFirstArgs>(args?: SelectSubset<T, AudienciaFindFirstArgs<ExtArgs>>): Prisma__AudienciaClient<$Result.GetResult<Prisma.$AudienciaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Audiencia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudienciaFindFirstOrThrowArgs} args - Arguments to find a Audiencia
     * @example
     * // Get one Audiencia
     * const audiencia = await prisma.audiencia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AudienciaFindFirstOrThrowArgs>(args?: SelectSubset<T, AudienciaFindFirstOrThrowArgs<ExtArgs>>): Prisma__AudienciaClient<$Result.GetResult<Prisma.$AudienciaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Audiencias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudienciaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Audiencias
     * const audiencias = await prisma.audiencia.findMany()
     * 
     * // Get first 10 Audiencias
     * const audiencias = await prisma.audiencia.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const audienciaWithIdOnly = await prisma.audiencia.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AudienciaFindManyArgs>(args?: SelectSubset<T, AudienciaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AudienciaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Audiencia.
     * @param {AudienciaCreateArgs} args - Arguments to create a Audiencia.
     * @example
     * // Create one Audiencia
     * const Audiencia = await prisma.audiencia.create({
     *   data: {
     *     // ... data to create a Audiencia
     *   }
     * })
     * 
     */
    create<T extends AudienciaCreateArgs>(args: SelectSubset<T, AudienciaCreateArgs<ExtArgs>>): Prisma__AudienciaClient<$Result.GetResult<Prisma.$AudienciaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Audiencias.
     * @param {AudienciaCreateManyArgs} args - Arguments to create many Audiencias.
     * @example
     * // Create many Audiencias
     * const audiencia = await prisma.audiencia.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AudienciaCreateManyArgs>(args?: SelectSubset<T, AudienciaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Audiencias and returns the data saved in the database.
     * @param {AudienciaCreateManyAndReturnArgs} args - Arguments to create many Audiencias.
     * @example
     * // Create many Audiencias
     * const audiencia = await prisma.audiencia.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Audiencias and only return the `id`
     * const audienciaWithIdOnly = await prisma.audiencia.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AudienciaCreateManyAndReturnArgs>(args?: SelectSubset<T, AudienciaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AudienciaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Audiencia.
     * @param {AudienciaDeleteArgs} args - Arguments to delete one Audiencia.
     * @example
     * // Delete one Audiencia
     * const Audiencia = await prisma.audiencia.delete({
     *   where: {
     *     // ... filter to delete one Audiencia
     *   }
     * })
     * 
     */
    delete<T extends AudienciaDeleteArgs>(args: SelectSubset<T, AudienciaDeleteArgs<ExtArgs>>): Prisma__AudienciaClient<$Result.GetResult<Prisma.$AudienciaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Audiencia.
     * @param {AudienciaUpdateArgs} args - Arguments to update one Audiencia.
     * @example
     * // Update one Audiencia
     * const audiencia = await prisma.audiencia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AudienciaUpdateArgs>(args: SelectSubset<T, AudienciaUpdateArgs<ExtArgs>>): Prisma__AudienciaClient<$Result.GetResult<Prisma.$AudienciaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Audiencias.
     * @param {AudienciaDeleteManyArgs} args - Arguments to filter Audiencias to delete.
     * @example
     * // Delete a few Audiencias
     * const { count } = await prisma.audiencia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AudienciaDeleteManyArgs>(args?: SelectSubset<T, AudienciaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Audiencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudienciaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Audiencias
     * const audiencia = await prisma.audiencia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AudienciaUpdateManyArgs>(args: SelectSubset<T, AudienciaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Audiencias and returns the data updated in the database.
     * @param {AudienciaUpdateManyAndReturnArgs} args - Arguments to update many Audiencias.
     * @example
     * // Update many Audiencias
     * const audiencia = await prisma.audiencia.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Audiencias and only return the `id`
     * const audienciaWithIdOnly = await prisma.audiencia.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AudienciaUpdateManyAndReturnArgs>(args: SelectSubset<T, AudienciaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AudienciaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Audiencia.
     * @param {AudienciaUpsertArgs} args - Arguments to update or create a Audiencia.
     * @example
     * // Update or create a Audiencia
     * const audiencia = await prisma.audiencia.upsert({
     *   create: {
     *     // ... data to create a Audiencia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Audiencia we want to update
     *   }
     * })
     */
    upsert<T extends AudienciaUpsertArgs>(args: SelectSubset<T, AudienciaUpsertArgs<ExtArgs>>): Prisma__AudienciaClient<$Result.GetResult<Prisma.$AudienciaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Audiencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudienciaCountArgs} args - Arguments to filter Audiencias to count.
     * @example
     * // Count the number of Audiencias
     * const count = await prisma.audiencia.count({
     *   where: {
     *     // ... the filter for the Audiencias we want to count
     *   }
     * })
    **/
    count<T extends AudienciaCountArgs>(
      args?: Subset<T, AudienciaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AudienciaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Audiencia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudienciaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AudienciaAggregateArgs>(args: Subset<T, AudienciaAggregateArgs>): Prisma.PrismaPromise<GetAudienciaAggregateType<T>>

    /**
     * Group by Audiencia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudienciaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AudienciaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AudienciaGroupByArgs['orderBy'] }
        : { orderBy?: AudienciaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AudienciaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAudienciaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Audiencia model
   */
  readonly fields: AudienciaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Audiencia.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AudienciaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trt<T extends TrtDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TrtDefaultArgs<ExtArgs>>): Prisma__TrtClient<$Result.GetResult<Prisma.$TrtPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    preposto<T extends PrepostoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PrepostoDefaultArgs<ExtArgs>>): Prisma__PrepostoClient<$Result.GetResult<Prisma.$PrepostoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    parceiro<T extends ParceiroDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ParceiroDefaultArgs<ExtArgs>>): Prisma__ParceiroClient<$Result.GetResult<Prisma.$ParceiroPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    importacao<T extends Audiencia$importacaoArgs<ExtArgs> = {}>(args?: Subset<T, Audiencia$importacaoArgs<ExtArgs>>): Prisma__ImportacaoClient<$Result.GetResult<Prisma.$ImportacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    mensagens<T extends Audiencia$mensagensArgs<ExtArgs> = {}>(args?: Subset<T, Audiencia$mensagensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    historicoStatus<T extends Audiencia$historicoStatusArgs<ExtArgs> = {}>(args?: Subset<T, Audiencia$historicoStatusArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistoricoStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    relatorio<T extends Audiencia$relatorioArgs<ExtArgs> = {}>(args?: Subset<T, Audiencia$relatorioArgs<ExtArgs>>): Prisma__RelatorioAudienciaClient<$Result.GetResult<Prisma.$RelatorioAudienciaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    substituicoes<T extends Audiencia$substituicoesArgs<ExtArgs> = {}>(args?: Subset<T, Audiencia$substituicoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubstituicaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Audiencia model
   */
  interface AudienciaFieldRefs {
    readonly id: FieldRef<"Audiencia", 'String'>
    readonly numeroProcesso: FieldRef<"Audiencia", 'String'>
    readonly reclamante: FieldRef<"Audiencia", 'String'>
    readonly data: FieldRef<"Audiencia", 'DateTime'>
    readonly hora: FieldRef<"Audiencia", 'String'>
    readonly modalidade: FieldRef<"Audiencia", 'Modalidade'>
    readonly local: FieldRef<"Audiencia", 'String'>
    readonly link: FieldRef<"Audiencia", 'String'>
    readonly trtId: FieldRef<"Audiencia", 'String'>
    readonly vara: FieldRef<"Audiencia", 'String'>
    readonly status: FieldRef<"Audiencia", 'StatusAudiencia'>
    readonly prepostoId: FieldRef<"Audiencia", 'String'>
    readonly parceiroId: FieldRef<"Audiencia", 'String'>
    readonly importacaoId: FieldRef<"Audiencia", 'String'>
    readonly observacoes: FieldRef<"Audiencia", 'String'>
    readonly createdAt: FieldRef<"Audiencia", 'DateTime'>
    readonly updatedAt: FieldRef<"Audiencia", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Audiencia findUnique
   */
  export type AudienciaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audiencia
     */
    select?: AudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Audiencia
     */
    omit?: AudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudienciaInclude<ExtArgs> | null
    /**
     * Filter, which Audiencia to fetch.
     */
    where: AudienciaWhereUniqueInput
  }

  /**
   * Audiencia findUniqueOrThrow
   */
  export type AudienciaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audiencia
     */
    select?: AudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Audiencia
     */
    omit?: AudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudienciaInclude<ExtArgs> | null
    /**
     * Filter, which Audiencia to fetch.
     */
    where: AudienciaWhereUniqueInput
  }

  /**
   * Audiencia findFirst
   */
  export type AudienciaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audiencia
     */
    select?: AudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Audiencia
     */
    omit?: AudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudienciaInclude<ExtArgs> | null
    /**
     * Filter, which Audiencia to fetch.
     */
    where?: AudienciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Audiencias to fetch.
     */
    orderBy?: AudienciaOrderByWithRelationInput | AudienciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Audiencias.
     */
    cursor?: AudienciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Audiencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Audiencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Audiencias.
     */
    distinct?: AudienciaScalarFieldEnum | AudienciaScalarFieldEnum[]
  }

  /**
   * Audiencia findFirstOrThrow
   */
  export type AudienciaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audiencia
     */
    select?: AudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Audiencia
     */
    omit?: AudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudienciaInclude<ExtArgs> | null
    /**
     * Filter, which Audiencia to fetch.
     */
    where?: AudienciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Audiencias to fetch.
     */
    orderBy?: AudienciaOrderByWithRelationInput | AudienciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Audiencias.
     */
    cursor?: AudienciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Audiencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Audiencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Audiencias.
     */
    distinct?: AudienciaScalarFieldEnum | AudienciaScalarFieldEnum[]
  }

  /**
   * Audiencia findMany
   */
  export type AudienciaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audiencia
     */
    select?: AudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Audiencia
     */
    omit?: AudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudienciaInclude<ExtArgs> | null
    /**
     * Filter, which Audiencias to fetch.
     */
    where?: AudienciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Audiencias to fetch.
     */
    orderBy?: AudienciaOrderByWithRelationInput | AudienciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Audiencias.
     */
    cursor?: AudienciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Audiencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Audiencias.
     */
    skip?: number
    distinct?: AudienciaScalarFieldEnum | AudienciaScalarFieldEnum[]
  }

  /**
   * Audiencia create
   */
  export type AudienciaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audiencia
     */
    select?: AudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Audiencia
     */
    omit?: AudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudienciaInclude<ExtArgs> | null
    /**
     * The data needed to create a Audiencia.
     */
    data: XOR<AudienciaCreateInput, AudienciaUncheckedCreateInput>
  }

  /**
   * Audiencia createMany
   */
  export type AudienciaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Audiencias.
     */
    data: AudienciaCreateManyInput | AudienciaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Audiencia createManyAndReturn
   */
  export type AudienciaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audiencia
     */
    select?: AudienciaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Audiencia
     */
    omit?: AudienciaOmit<ExtArgs> | null
    /**
     * The data used to create many Audiencias.
     */
    data: AudienciaCreateManyInput | AudienciaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudienciaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Audiencia update
   */
  export type AudienciaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audiencia
     */
    select?: AudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Audiencia
     */
    omit?: AudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudienciaInclude<ExtArgs> | null
    /**
     * The data needed to update a Audiencia.
     */
    data: XOR<AudienciaUpdateInput, AudienciaUncheckedUpdateInput>
    /**
     * Choose, which Audiencia to update.
     */
    where: AudienciaWhereUniqueInput
  }

  /**
   * Audiencia updateMany
   */
  export type AudienciaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Audiencias.
     */
    data: XOR<AudienciaUpdateManyMutationInput, AudienciaUncheckedUpdateManyInput>
    /**
     * Filter which Audiencias to update
     */
    where?: AudienciaWhereInput
    /**
     * Limit how many Audiencias to update.
     */
    limit?: number
  }

  /**
   * Audiencia updateManyAndReturn
   */
  export type AudienciaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audiencia
     */
    select?: AudienciaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Audiencia
     */
    omit?: AudienciaOmit<ExtArgs> | null
    /**
     * The data used to update Audiencias.
     */
    data: XOR<AudienciaUpdateManyMutationInput, AudienciaUncheckedUpdateManyInput>
    /**
     * Filter which Audiencias to update
     */
    where?: AudienciaWhereInput
    /**
     * Limit how many Audiencias to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudienciaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Audiencia upsert
   */
  export type AudienciaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audiencia
     */
    select?: AudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Audiencia
     */
    omit?: AudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudienciaInclude<ExtArgs> | null
    /**
     * The filter to search for the Audiencia to update in case it exists.
     */
    where: AudienciaWhereUniqueInput
    /**
     * In case the Audiencia found by the `where` argument doesn't exist, create a new Audiencia with this data.
     */
    create: XOR<AudienciaCreateInput, AudienciaUncheckedCreateInput>
    /**
     * In case the Audiencia was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AudienciaUpdateInput, AudienciaUncheckedUpdateInput>
  }

  /**
   * Audiencia delete
   */
  export type AudienciaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audiencia
     */
    select?: AudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Audiencia
     */
    omit?: AudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudienciaInclude<ExtArgs> | null
    /**
     * Filter which Audiencia to delete.
     */
    where: AudienciaWhereUniqueInput
  }

  /**
   * Audiencia deleteMany
   */
  export type AudienciaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Audiencias to delete
     */
    where?: AudienciaWhereInput
    /**
     * Limit how many Audiencias to delete.
     */
    limit?: number
  }

  /**
   * Audiencia.importacao
   */
  export type Audiencia$importacaoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Importacao
     */
    select?: ImportacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Importacao
     */
    omit?: ImportacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportacaoInclude<ExtArgs> | null
    where?: ImportacaoWhereInput
  }

  /**
   * Audiencia.mensagens
   */
  export type Audiencia$mensagensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagem
     */
    omit?: MensagemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    where?: MensagemWhereInput
    orderBy?: MensagemOrderByWithRelationInput | MensagemOrderByWithRelationInput[]
    cursor?: MensagemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MensagemScalarFieldEnum | MensagemScalarFieldEnum[]
  }

  /**
   * Audiencia.historicoStatus
   */
  export type Audiencia$historicoStatusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoStatus
     */
    select?: HistoricoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoricoStatus
     */
    omit?: HistoricoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoStatusInclude<ExtArgs> | null
    where?: HistoricoStatusWhereInput
    orderBy?: HistoricoStatusOrderByWithRelationInput | HistoricoStatusOrderByWithRelationInput[]
    cursor?: HistoricoStatusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HistoricoStatusScalarFieldEnum | HistoricoStatusScalarFieldEnum[]
  }

  /**
   * Audiencia.relatorio
   */
  export type Audiencia$relatorioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RelatorioAudiencia
     */
    select?: RelatorioAudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RelatorioAudiencia
     */
    omit?: RelatorioAudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelatorioAudienciaInclude<ExtArgs> | null
    where?: RelatorioAudienciaWhereInput
  }

  /**
   * Audiencia.substituicoes
   */
  export type Audiencia$substituicoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Substituicao
     */
    select?: SubstituicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Substituicao
     */
    omit?: SubstituicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubstituicaoInclude<ExtArgs> | null
    where?: SubstituicaoWhereInput
    orderBy?: SubstituicaoOrderByWithRelationInput | SubstituicaoOrderByWithRelationInput[]
    cursor?: SubstituicaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubstituicaoScalarFieldEnum | SubstituicaoScalarFieldEnum[]
  }

  /**
   * Audiencia without action
   */
  export type AudienciaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audiencia
     */
    select?: AudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Audiencia
     */
    omit?: AudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudienciaInclude<ExtArgs> | null
  }


  /**
   * Model Mensagem
   */

  export type AggregateMensagem = {
    _count: MensagemCountAggregateOutputType | null
    _min: MensagemMinAggregateOutputType | null
    _max: MensagemMaxAggregateOutputType | null
  }

  export type MensagemMinAggregateOutputType = {
    id: string | null
    audienciaId: string | null
    prepostoId: string | null
    contatoParceiroId: string | null
    tipo: $Enums.TipoMensagem | null
    direcao: $Enums.DirecaoMensagem | null
    conteudo: string | null
    respostaBotao: string | null
    observacao: string | null
    whatsappMessageId: string | null
    statusEnvio: $Enums.StatusEnvioMensagem | null
    createdAt: Date | null
  }

  export type MensagemMaxAggregateOutputType = {
    id: string | null
    audienciaId: string | null
    prepostoId: string | null
    contatoParceiroId: string | null
    tipo: $Enums.TipoMensagem | null
    direcao: $Enums.DirecaoMensagem | null
    conteudo: string | null
    respostaBotao: string | null
    observacao: string | null
    whatsappMessageId: string | null
    statusEnvio: $Enums.StatusEnvioMensagem | null
    createdAt: Date | null
  }

  export type MensagemCountAggregateOutputType = {
    id: number
    audienciaId: number
    prepostoId: number
    contatoParceiroId: number
    tipo: number
    direcao: number
    conteudo: number
    respostaBotao: number
    observacao: number
    whatsappMessageId: number
    statusEnvio: number
    createdAt: number
    _all: number
  }


  export type MensagemMinAggregateInputType = {
    id?: true
    audienciaId?: true
    prepostoId?: true
    contatoParceiroId?: true
    tipo?: true
    direcao?: true
    conteudo?: true
    respostaBotao?: true
    observacao?: true
    whatsappMessageId?: true
    statusEnvio?: true
    createdAt?: true
  }

  export type MensagemMaxAggregateInputType = {
    id?: true
    audienciaId?: true
    prepostoId?: true
    contatoParceiroId?: true
    tipo?: true
    direcao?: true
    conteudo?: true
    respostaBotao?: true
    observacao?: true
    whatsappMessageId?: true
    statusEnvio?: true
    createdAt?: true
  }

  export type MensagemCountAggregateInputType = {
    id?: true
    audienciaId?: true
    prepostoId?: true
    contatoParceiroId?: true
    tipo?: true
    direcao?: true
    conteudo?: true
    respostaBotao?: true
    observacao?: true
    whatsappMessageId?: true
    statusEnvio?: true
    createdAt?: true
    _all?: true
  }

  export type MensagemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mensagem to aggregate.
     */
    where?: MensagemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mensagems to fetch.
     */
    orderBy?: MensagemOrderByWithRelationInput | MensagemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MensagemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mensagems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mensagems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Mensagems
    **/
    _count?: true | MensagemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MensagemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MensagemMaxAggregateInputType
  }

  export type GetMensagemAggregateType<T extends MensagemAggregateArgs> = {
        [P in keyof T & keyof AggregateMensagem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMensagem[P]>
      : GetScalarType<T[P], AggregateMensagem[P]>
  }




  export type MensagemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MensagemWhereInput
    orderBy?: MensagemOrderByWithAggregationInput | MensagemOrderByWithAggregationInput[]
    by: MensagemScalarFieldEnum[] | MensagemScalarFieldEnum
    having?: MensagemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MensagemCountAggregateInputType | true
    _min?: MensagemMinAggregateInputType
    _max?: MensagemMaxAggregateInputType
  }

  export type MensagemGroupByOutputType = {
    id: string
    audienciaId: string
    prepostoId: string | null
    contatoParceiroId: string | null
    tipo: $Enums.TipoMensagem
    direcao: $Enums.DirecaoMensagem
    conteudo: string
    respostaBotao: string | null
    observacao: string | null
    whatsappMessageId: string | null
    statusEnvio: $Enums.StatusEnvioMensagem
    createdAt: Date
    _count: MensagemCountAggregateOutputType | null
    _min: MensagemMinAggregateOutputType | null
    _max: MensagemMaxAggregateOutputType | null
  }

  type GetMensagemGroupByPayload<T extends MensagemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MensagemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MensagemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MensagemGroupByOutputType[P]>
            : GetScalarType<T[P], MensagemGroupByOutputType[P]>
        }
      >
    >


  export type MensagemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    audienciaId?: boolean
    prepostoId?: boolean
    contatoParceiroId?: boolean
    tipo?: boolean
    direcao?: boolean
    conteudo?: boolean
    respostaBotao?: boolean
    observacao?: boolean
    whatsappMessageId?: boolean
    statusEnvio?: boolean
    createdAt?: boolean
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
    preposto?: boolean | Mensagem$prepostoArgs<ExtArgs>
    contatoParceiro?: boolean | Mensagem$contatoParceiroArgs<ExtArgs>
  }, ExtArgs["result"]["mensagem"]>

  export type MensagemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    audienciaId?: boolean
    prepostoId?: boolean
    contatoParceiroId?: boolean
    tipo?: boolean
    direcao?: boolean
    conteudo?: boolean
    respostaBotao?: boolean
    observacao?: boolean
    whatsappMessageId?: boolean
    statusEnvio?: boolean
    createdAt?: boolean
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
    preposto?: boolean | Mensagem$prepostoArgs<ExtArgs>
    contatoParceiro?: boolean | Mensagem$contatoParceiroArgs<ExtArgs>
  }, ExtArgs["result"]["mensagem"]>

  export type MensagemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    audienciaId?: boolean
    prepostoId?: boolean
    contatoParceiroId?: boolean
    tipo?: boolean
    direcao?: boolean
    conteudo?: boolean
    respostaBotao?: boolean
    observacao?: boolean
    whatsappMessageId?: boolean
    statusEnvio?: boolean
    createdAt?: boolean
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
    preposto?: boolean | Mensagem$prepostoArgs<ExtArgs>
    contatoParceiro?: boolean | Mensagem$contatoParceiroArgs<ExtArgs>
  }, ExtArgs["result"]["mensagem"]>

  export type MensagemSelectScalar = {
    id?: boolean
    audienciaId?: boolean
    prepostoId?: boolean
    contatoParceiroId?: boolean
    tipo?: boolean
    direcao?: boolean
    conteudo?: boolean
    respostaBotao?: boolean
    observacao?: boolean
    whatsappMessageId?: boolean
    statusEnvio?: boolean
    createdAt?: boolean
  }

  export type MensagemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "audienciaId" | "prepostoId" | "contatoParceiroId" | "tipo" | "direcao" | "conteudo" | "respostaBotao" | "observacao" | "whatsappMessageId" | "statusEnvio" | "createdAt", ExtArgs["result"]["mensagem"]>
  export type MensagemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
    preposto?: boolean | Mensagem$prepostoArgs<ExtArgs>
    contatoParceiro?: boolean | Mensagem$contatoParceiroArgs<ExtArgs>
  }
  export type MensagemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
    preposto?: boolean | Mensagem$prepostoArgs<ExtArgs>
    contatoParceiro?: boolean | Mensagem$contatoParceiroArgs<ExtArgs>
  }
  export type MensagemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
    preposto?: boolean | Mensagem$prepostoArgs<ExtArgs>
    contatoParceiro?: boolean | Mensagem$contatoParceiroArgs<ExtArgs>
  }

  export type $MensagemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mensagem"
    objects: {
      audiencia: Prisma.$AudienciaPayload<ExtArgs>
      preposto: Prisma.$PrepostoPayload<ExtArgs> | null
      contatoParceiro: Prisma.$ContatoParceiroPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      audienciaId: string
      prepostoId: string | null
      contatoParceiroId: string | null
      tipo: $Enums.TipoMensagem
      direcao: $Enums.DirecaoMensagem
      conteudo: string
      respostaBotao: string | null
      observacao: string | null
      whatsappMessageId: string | null
      statusEnvio: $Enums.StatusEnvioMensagem
      createdAt: Date
    }, ExtArgs["result"]["mensagem"]>
    composites: {}
  }

  type MensagemGetPayload<S extends boolean | null | undefined | MensagemDefaultArgs> = $Result.GetResult<Prisma.$MensagemPayload, S>

  type MensagemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MensagemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MensagemCountAggregateInputType | true
    }

  export interface MensagemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mensagem'], meta: { name: 'Mensagem' } }
    /**
     * Find zero or one Mensagem that matches the filter.
     * @param {MensagemFindUniqueArgs} args - Arguments to find a Mensagem
     * @example
     * // Get one Mensagem
     * const mensagem = await prisma.mensagem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MensagemFindUniqueArgs>(args: SelectSubset<T, MensagemFindUniqueArgs<ExtArgs>>): Prisma__MensagemClient<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mensagem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MensagemFindUniqueOrThrowArgs} args - Arguments to find a Mensagem
     * @example
     * // Get one Mensagem
     * const mensagem = await prisma.mensagem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MensagemFindUniqueOrThrowArgs>(args: SelectSubset<T, MensagemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MensagemClient<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mensagem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagemFindFirstArgs} args - Arguments to find a Mensagem
     * @example
     * // Get one Mensagem
     * const mensagem = await prisma.mensagem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MensagemFindFirstArgs>(args?: SelectSubset<T, MensagemFindFirstArgs<ExtArgs>>): Prisma__MensagemClient<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mensagem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagemFindFirstOrThrowArgs} args - Arguments to find a Mensagem
     * @example
     * // Get one Mensagem
     * const mensagem = await prisma.mensagem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MensagemFindFirstOrThrowArgs>(args?: SelectSubset<T, MensagemFindFirstOrThrowArgs<ExtArgs>>): Prisma__MensagemClient<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mensagems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mensagems
     * const mensagems = await prisma.mensagem.findMany()
     * 
     * // Get first 10 Mensagems
     * const mensagems = await prisma.mensagem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mensagemWithIdOnly = await prisma.mensagem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MensagemFindManyArgs>(args?: SelectSubset<T, MensagemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mensagem.
     * @param {MensagemCreateArgs} args - Arguments to create a Mensagem.
     * @example
     * // Create one Mensagem
     * const Mensagem = await prisma.mensagem.create({
     *   data: {
     *     // ... data to create a Mensagem
     *   }
     * })
     * 
     */
    create<T extends MensagemCreateArgs>(args: SelectSubset<T, MensagemCreateArgs<ExtArgs>>): Prisma__MensagemClient<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mensagems.
     * @param {MensagemCreateManyArgs} args - Arguments to create many Mensagems.
     * @example
     * // Create many Mensagems
     * const mensagem = await prisma.mensagem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MensagemCreateManyArgs>(args?: SelectSubset<T, MensagemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Mensagems and returns the data saved in the database.
     * @param {MensagemCreateManyAndReturnArgs} args - Arguments to create many Mensagems.
     * @example
     * // Create many Mensagems
     * const mensagem = await prisma.mensagem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Mensagems and only return the `id`
     * const mensagemWithIdOnly = await prisma.mensagem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MensagemCreateManyAndReturnArgs>(args?: SelectSubset<T, MensagemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mensagem.
     * @param {MensagemDeleteArgs} args - Arguments to delete one Mensagem.
     * @example
     * // Delete one Mensagem
     * const Mensagem = await prisma.mensagem.delete({
     *   where: {
     *     // ... filter to delete one Mensagem
     *   }
     * })
     * 
     */
    delete<T extends MensagemDeleteArgs>(args: SelectSubset<T, MensagemDeleteArgs<ExtArgs>>): Prisma__MensagemClient<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mensagem.
     * @param {MensagemUpdateArgs} args - Arguments to update one Mensagem.
     * @example
     * // Update one Mensagem
     * const mensagem = await prisma.mensagem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MensagemUpdateArgs>(args: SelectSubset<T, MensagemUpdateArgs<ExtArgs>>): Prisma__MensagemClient<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mensagems.
     * @param {MensagemDeleteManyArgs} args - Arguments to filter Mensagems to delete.
     * @example
     * // Delete a few Mensagems
     * const { count } = await prisma.mensagem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MensagemDeleteManyArgs>(args?: SelectSubset<T, MensagemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mensagems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mensagems
     * const mensagem = await prisma.mensagem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MensagemUpdateManyArgs>(args: SelectSubset<T, MensagemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mensagems and returns the data updated in the database.
     * @param {MensagemUpdateManyAndReturnArgs} args - Arguments to update many Mensagems.
     * @example
     * // Update many Mensagems
     * const mensagem = await prisma.mensagem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Mensagems and only return the `id`
     * const mensagemWithIdOnly = await prisma.mensagem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MensagemUpdateManyAndReturnArgs>(args: SelectSubset<T, MensagemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mensagem.
     * @param {MensagemUpsertArgs} args - Arguments to update or create a Mensagem.
     * @example
     * // Update or create a Mensagem
     * const mensagem = await prisma.mensagem.upsert({
     *   create: {
     *     // ... data to create a Mensagem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mensagem we want to update
     *   }
     * })
     */
    upsert<T extends MensagemUpsertArgs>(args: SelectSubset<T, MensagemUpsertArgs<ExtArgs>>): Prisma__MensagemClient<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Mensagems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagemCountArgs} args - Arguments to filter Mensagems to count.
     * @example
     * // Count the number of Mensagems
     * const count = await prisma.mensagem.count({
     *   where: {
     *     // ... the filter for the Mensagems we want to count
     *   }
     * })
    **/
    count<T extends MensagemCountArgs>(
      args?: Subset<T, MensagemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MensagemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mensagem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MensagemAggregateArgs>(args: Subset<T, MensagemAggregateArgs>): Prisma.PrismaPromise<GetMensagemAggregateType<T>>

    /**
     * Group by Mensagem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MensagemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MensagemGroupByArgs['orderBy'] }
        : { orderBy?: MensagemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MensagemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMensagemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mensagem model
   */
  readonly fields: MensagemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mensagem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MensagemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    audiencia<T extends AudienciaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AudienciaDefaultArgs<ExtArgs>>): Prisma__AudienciaClient<$Result.GetResult<Prisma.$AudienciaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    preposto<T extends Mensagem$prepostoArgs<ExtArgs> = {}>(args?: Subset<T, Mensagem$prepostoArgs<ExtArgs>>): Prisma__PrepostoClient<$Result.GetResult<Prisma.$PrepostoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    contatoParceiro<T extends Mensagem$contatoParceiroArgs<ExtArgs> = {}>(args?: Subset<T, Mensagem$contatoParceiroArgs<ExtArgs>>): Prisma__ContatoParceiroClient<$Result.GetResult<Prisma.$ContatoParceiroPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Mensagem model
   */
  interface MensagemFieldRefs {
    readonly id: FieldRef<"Mensagem", 'String'>
    readonly audienciaId: FieldRef<"Mensagem", 'String'>
    readonly prepostoId: FieldRef<"Mensagem", 'String'>
    readonly contatoParceiroId: FieldRef<"Mensagem", 'String'>
    readonly tipo: FieldRef<"Mensagem", 'TipoMensagem'>
    readonly direcao: FieldRef<"Mensagem", 'DirecaoMensagem'>
    readonly conteudo: FieldRef<"Mensagem", 'String'>
    readonly respostaBotao: FieldRef<"Mensagem", 'String'>
    readonly observacao: FieldRef<"Mensagem", 'String'>
    readonly whatsappMessageId: FieldRef<"Mensagem", 'String'>
    readonly statusEnvio: FieldRef<"Mensagem", 'StatusEnvioMensagem'>
    readonly createdAt: FieldRef<"Mensagem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Mensagem findUnique
   */
  export type MensagemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagem
     */
    omit?: MensagemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    /**
     * Filter, which Mensagem to fetch.
     */
    where: MensagemWhereUniqueInput
  }

  /**
   * Mensagem findUniqueOrThrow
   */
  export type MensagemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagem
     */
    omit?: MensagemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    /**
     * Filter, which Mensagem to fetch.
     */
    where: MensagemWhereUniqueInput
  }

  /**
   * Mensagem findFirst
   */
  export type MensagemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagem
     */
    omit?: MensagemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    /**
     * Filter, which Mensagem to fetch.
     */
    where?: MensagemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mensagems to fetch.
     */
    orderBy?: MensagemOrderByWithRelationInput | MensagemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mensagems.
     */
    cursor?: MensagemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mensagems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mensagems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mensagems.
     */
    distinct?: MensagemScalarFieldEnum | MensagemScalarFieldEnum[]
  }

  /**
   * Mensagem findFirstOrThrow
   */
  export type MensagemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagem
     */
    omit?: MensagemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    /**
     * Filter, which Mensagem to fetch.
     */
    where?: MensagemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mensagems to fetch.
     */
    orderBy?: MensagemOrderByWithRelationInput | MensagemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mensagems.
     */
    cursor?: MensagemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mensagems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mensagems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mensagems.
     */
    distinct?: MensagemScalarFieldEnum | MensagemScalarFieldEnum[]
  }

  /**
   * Mensagem findMany
   */
  export type MensagemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagem
     */
    omit?: MensagemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    /**
     * Filter, which Mensagems to fetch.
     */
    where?: MensagemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mensagems to fetch.
     */
    orderBy?: MensagemOrderByWithRelationInput | MensagemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Mensagems.
     */
    cursor?: MensagemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mensagems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mensagems.
     */
    skip?: number
    distinct?: MensagemScalarFieldEnum | MensagemScalarFieldEnum[]
  }

  /**
   * Mensagem create
   */
  export type MensagemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagem
     */
    omit?: MensagemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    /**
     * The data needed to create a Mensagem.
     */
    data: XOR<MensagemCreateInput, MensagemUncheckedCreateInput>
  }

  /**
   * Mensagem createMany
   */
  export type MensagemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Mensagems.
     */
    data: MensagemCreateManyInput | MensagemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mensagem createManyAndReturn
   */
  export type MensagemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagem
     */
    omit?: MensagemOmit<ExtArgs> | null
    /**
     * The data used to create many Mensagems.
     */
    data: MensagemCreateManyInput | MensagemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Mensagem update
   */
  export type MensagemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagem
     */
    omit?: MensagemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    /**
     * The data needed to update a Mensagem.
     */
    data: XOR<MensagemUpdateInput, MensagemUncheckedUpdateInput>
    /**
     * Choose, which Mensagem to update.
     */
    where: MensagemWhereUniqueInput
  }

  /**
   * Mensagem updateMany
   */
  export type MensagemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Mensagems.
     */
    data: XOR<MensagemUpdateManyMutationInput, MensagemUncheckedUpdateManyInput>
    /**
     * Filter which Mensagems to update
     */
    where?: MensagemWhereInput
    /**
     * Limit how many Mensagems to update.
     */
    limit?: number
  }

  /**
   * Mensagem updateManyAndReturn
   */
  export type MensagemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagem
     */
    omit?: MensagemOmit<ExtArgs> | null
    /**
     * The data used to update Mensagems.
     */
    data: XOR<MensagemUpdateManyMutationInput, MensagemUncheckedUpdateManyInput>
    /**
     * Filter which Mensagems to update
     */
    where?: MensagemWhereInput
    /**
     * Limit how many Mensagems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Mensagem upsert
   */
  export type MensagemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagem
     */
    omit?: MensagemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    /**
     * The filter to search for the Mensagem to update in case it exists.
     */
    where: MensagemWhereUniqueInput
    /**
     * In case the Mensagem found by the `where` argument doesn't exist, create a new Mensagem with this data.
     */
    create: XOR<MensagemCreateInput, MensagemUncheckedCreateInput>
    /**
     * In case the Mensagem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MensagemUpdateInput, MensagemUncheckedUpdateInput>
  }

  /**
   * Mensagem delete
   */
  export type MensagemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagem
     */
    omit?: MensagemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    /**
     * Filter which Mensagem to delete.
     */
    where: MensagemWhereUniqueInput
  }

  /**
   * Mensagem deleteMany
   */
  export type MensagemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mensagems to delete
     */
    where?: MensagemWhereInput
    /**
     * Limit how many Mensagems to delete.
     */
    limit?: number
  }

  /**
   * Mensagem.preposto
   */
  export type Mensagem$prepostoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preposto
     */
    select?: PrepostoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preposto
     */
    omit?: PrepostoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrepostoInclude<ExtArgs> | null
    where?: PrepostoWhereInput
  }

  /**
   * Mensagem.contatoParceiro
   */
  export type Mensagem$contatoParceiroArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContatoParceiro
     */
    select?: ContatoParceiroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContatoParceiro
     */
    omit?: ContatoParceiroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoParceiroInclude<ExtArgs> | null
    where?: ContatoParceiroWhereInput
  }

  /**
   * Mensagem without action
   */
  export type MensagemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagem
     */
    omit?: MensagemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
  }


  /**
   * Model RelatorioAudiencia
   */

  export type AggregateRelatorioAudiencia = {
    _count: RelatorioAudienciaCountAggregateOutputType | null
    _min: RelatorioAudienciaMinAggregateOutputType | null
    _max: RelatorioAudienciaMaxAggregateOutputType | null
  }

  export type RelatorioAudienciaMinAggregateOutputType = {
    id: string | null
    audienciaId: string | null
    audienciaOcorreu: $Enums.OcorrenciaAudiencia | null
    resultado: $Enums.ResultadoAudiencia | null
    advogadoPresente: boolean | null
    advogadoDominioCaso: boolean | null
    problemaRelevante: boolean | null
    relato: string | null
    createdAt: Date | null
  }

  export type RelatorioAudienciaMaxAggregateOutputType = {
    id: string | null
    audienciaId: string | null
    audienciaOcorreu: $Enums.OcorrenciaAudiencia | null
    resultado: $Enums.ResultadoAudiencia | null
    advogadoPresente: boolean | null
    advogadoDominioCaso: boolean | null
    problemaRelevante: boolean | null
    relato: string | null
    createdAt: Date | null
  }

  export type RelatorioAudienciaCountAggregateOutputType = {
    id: number
    audienciaId: number
    audienciaOcorreu: number
    resultado: number
    advogadoPresente: number
    advogadoDominioCaso: number
    problemaRelevante: number
    relato: number
    createdAt: number
    _all: number
  }


  export type RelatorioAudienciaMinAggregateInputType = {
    id?: true
    audienciaId?: true
    audienciaOcorreu?: true
    resultado?: true
    advogadoPresente?: true
    advogadoDominioCaso?: true
    problemaRelevante?: true
    relato?: true
    createdAt?: true
  }

  export type RelatorioAudienciaMaxAggregateInputType = {
    id?: true
    audienciaId?: true
    audienciaOcorreu?: true
    resultado?: true
    advogadoPresente?: true
    advogadoDominioCaso?: true
    problemaRelevante?: true
    relato?: true
    createdAt?: true
  }

  export type RelatorioAudienciaCountAggregateInputType = {
    id?: true
    audienciaId?: true
    audienciaOcorreu?: true
    resultado?: true
    advogadoPresente?: true
    advogadoDominioCaso?: true
    problemaRelevante?: true
    relato?: true
    createdAt?: true
    _all?: true
  }

  export type RelatorioAudienciaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RelatorioAudiencia to aggregate.
     */
    where?: RelatorioAudienciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RelatorioAudiencias to fetch.
     */
    orderBy?: RelatorioAudienciaOrderByWithRelationInput | RelatorioAudienciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RelatorioAudienciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RelatorioAudiencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RelatorioAudiencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RelatorioAudiencias
    **/
    _count?: true | RelatorioAudienciaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RelatorioAudienciaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RelatorioAudienciaMaxAggregateInputType
  }

  export type GetRelatorioAudienciaAggregateType<T extends RelatorioAudienciaAggregateArgs> = {
        [P in keyof T & keyof AggregateRelatorioAudiencia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRelatorioAudiencia[P]>
      : GetScalarType<T[P], AggregateRelatorioAudiencia[P]>
  }




  export type RelatorioAudienciaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RelatorioAudienciaWhereInput
    orderBy?: RelatorioAudienciaOrderByWithAggregationInput | RelatorioAudienciaOrderByWithAggregationInput[]
    by: RelatorioAudienciaScalarFieldEnum[] | RelatorioAudienciaScalarFieldEnum
    having?: RelatorioAudienciaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RelatorioAudienciaCountAggregateInputType | true
    _min?: RelatorioAudienciaMinAggregateInputType
    _max?: RelatorioAudienciaMaxAggregateInputType
  }

  export type RelatorioAudienciaGroupByOutputType = {
    id: string
    audienciaId: string
    audienciaOcorreu: $Enums.OcorrenciaAudiencia | null
    resultado: $Enums.ResultadoAudiencia | null
    advogadoPresente: boolean | null
    advogadoDominioCaso: boolean | null
    problemaRelevante: boolean | null
    relato: string | null
    createdAt: Date
    _count: RelatorioAudienciaCountAggregateOutputType | null
    _min: RelatorioAudienciaMinAggregateOutputType | null
    _max: RelatorioAudienciaMaxAggregateOutputType | null
  }

  type GetRelatorioAudienciaGroupByPayload<T extends RelatorioAudienciaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RelatorioAudienciaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RelatorioAudienciaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RelatorioAudienciaGroupByOutputType[P]>
            : GetScalarType<T[P], RelatorioAudienciaGroupByOutputType[P]>
        }
      >
    >


  export type RelatorioAudienciaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    audienciaId?: boolean
    audienciaOcorreu?: boolean
    resultado?: boolean
    advogadoPresente?: boolean
    advogadoDominioCaso?: boolean
    problemaRelevante?: boolean
    relato?: boolean
    createdAt?: boolean
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["relatorioAudiencia"]>

  export type RelatorioAudienciaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    audienciaId?: boolean
    audienciaOcorreu?: boolean
    resultado?: boolean
    advogadoPresente?: boolean
    advogadoDominioCaso?: boolean
    problemaRelevante?: boolean
    relato?: boolean
    createdAt?: boolean
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["relatorioAudiencia"]>

  export type RelatorioAudienciaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    audienciaId?: boolean
    audienciaOcorreu?: boolean
    resultado?: boolean
    advogadoPresente?: boolean
    advogadoDominioCaso?: boolean
    problemaRelevante?: boolean
    relato?: boolean
    createdAt?: boolean
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["relatorioAudiencia"]>

  export type RelatorioAudienciaSelectScalar = {
    id?: boolean
    audienciaId?: boolean
    audienciaOcorreu?: boolean
    resultado?: boolean
    advogadoPresente?: boolean
    advogadoDominioCaso?: boolean
    problemaRelevante?: boolean
    relato?: boolean
    createdAt?: boolean
  }

  export type RelatorioAudienciaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "audienciaId" | "audienciaOcorreu" | "resultado" | "advogadoPresente" | "advogadoDominioCaso" | "problemaRelevante" | "relato" | "createdAt", ExtArgs["result"]["relatorioAudiencia"]>
  export type RelatorioAudienciaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
  }
  export type RelatorioAudienciaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
  }
  export type RelatorioAudienciaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
  }

  export type $RelatorioAudienciaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RelatorioAudiencia"
    objects: {
      audiencia: Prisma.$AudienciaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      audienciaId: string
      audienciaOcorreu: $Enums.OcorrenciaAudiencia | null
      resultado: $Enums.ResultadoAudiencia | null
      advogadoPresente: boolean | null
      advogadoDominioCaso: boolean | null
      problemaRelevante: boolean | null
      relato: string | null
      createdAt: Date
    }, ExtArgs["result"]["relatorioAudiencia"]>
    composites: {}
  }

  type RelatorioAudienciaGetPayload<S extends boolean | null | undefined | RelatorioAudienciaDefaultArgs> = $Result.GetResult<Prisma.$RelatorioAudienciaPayload, S>

  type RelatorioAudienciaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RelatorioAudienciaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RelatorioAudienciaCountAggregateInputType | true
    }

  export interface RelatorioAudienciaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RelatorioAudiencia'], meta: { name: 'RelatorioAudiencia' } }
    /**
     * Find zero or one RelatorioAudiencia that matches the filter.
     * @param {RelatorioAudienciaFindUniqueArgs} args - Arguments to find a RelatorioAudiencia
     * @example
     * // Get one RelatorioAudiencia
     * const relatorioAudiencia = await prisma.relatorioAudiencia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RelatorioAudienciaFindUniqueArgs>(args: SelectSubset<T, RelatorioAudienciaFindUniqueArgs<ExtArgs>>): Prisma__RelatorioAudienciaClient<$Result.GetResult<Prisma.$RelatorioAudienciaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RelatorioAudiencia that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RelatorioAudienciaFindUniqueOrThrowArgs} args - Arguments to find a RelatorioAudiencia
     * @example
     * // Get one RelatorioAudiencia
     * const relatorioAudiencia = await prisma.relatorioAudiencia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RelatorioAudienciaFindUniqueOrThrowArgs>(args: SelectSubset<T, RelatorioAudienciaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RelatorioAudienciaClient<$Result.GetResult<Prisma.$RelatorioAudienciaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RelatorioAudiencia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelatorioAudienciaFindFirstArgs} args - Arguments to find a RelatorioAudiencia
     * @example
     * // Get one RelatorioAudiencia
     * const relatorioAudiencia = await prisma.relatorioAudiencia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RelatorioAudienciaFindFirstArgs>(args?: SelectSubset<T, RelatorioAudienciaFindFirstArgs<ExtArgs>>): Prisma__RelatorioAudienciaClient<$Result.GetResult<Prisma.$RelatorioAudienciaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RelatorioAudiencia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelatorioAudienciaFindFirstOrThrowArgs} args - Arguments to find a RelatorioAudiencia
     * @example
     * // Get one RelatorioAudiencia
     * const relatorioAudiencia = await prisma.relatorioAudiencia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RelatorioAudienciaFindFirstOrThrowArgs>(args?: SelectSubset<T, RelatorioAudienciaFindFirstOrThrowArgs<ExtArgs>>): Prisma__RelatorioAudienciaClient<$Result.GetResult<Prisma.$RelatorioAudienciaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RelatorioAudiencias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelatorioAudienciaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RelatorioAudiencias
     * const relatorioAudiencias = await prisma.relatorioAudiencia.findMany()
     * 
     * // Get first 10 RelatorioAudiencias
     * const relatorioAudiencias = await prisma.relatorioAudiencia.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const relatorioAudienciaWithIdOnly = await prisma.relatorioAudiencia.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RelatorioAudienciaFindManyArgs>(args?: SelectSubset<T, RelatorioAudienciaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RelatorioAudienciaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RelatorioAudiencia.
     * @param {RelatorioAudienciaCreateArgs} args - Arguments to create a RelatorioAudiencia.
     * @example
     * // Create one RelatorioAudiencia
     * const RelatorioAudiencia = await prisma.relatorioAudiencia.create({
     *   data: {
     *     // ... data to create a RelatorioAudiencia
     *   }
     * })
     * 
     */
    create<T extends RelatorioAudienciaCreateArgs>(args: SelectSubset<T, RelatorioAudienciaCreateArgs<ExtArgs>>): Prisma__RelatorioAudienciaClient<$Result.GetResult<Prisma.$RelatorioAudienciaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RelatorioAudiencias.
     * @param {RelatorioAudienciaCreateManyArgs} args - Arguments to create many RelatorioAudiencias.
     * @example
     * // Create many RelatorioAudiencias
     * const relatorioAudiencia = await prisma.relatorioAudiencia.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RelatorioAudienciaCreateManyArgs>(args?: SelectSubset<T, RelatorioAudienciaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RelatorioAudiencias and returns the data saved in the database.
     * @param {RelatorioAudienciaCreateManyAndReturnArgs} args - Arguments to create many RelatorioAudiencias.
     * @example
     * // Create many RelatorioAudiencias
     * const relatorioAudiencia = await prisma.relatorioAudiencia.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RelatorioAudiencias and only return the `id`
     * const relatorioAudienciaWithIdOnly = await prisma.relatorioAudiencia.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RelatorioAudienciaCreateManyAndReturnArgs>(args?: SelectSubset<T, RelatorioAudienciaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RelatorioAudienciaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RelatorioAudiencia.
     * @param {RelatorioAudienciaDeleteArgs} args - Arguments to delete one RelatorioAudiencia.
     * @example
     * // Delete one RelatorioAudiencia
     * const RelatorioAudiencia = await prisma.relatorioAudiencia.delete({
     *   where: {
     *     // ... filter to delete one RelatorioAudiencia
     *   }
     * })
     * 
     */
    delete<T extends RelatorioAudienciaDeleteArgs>(args: SelectSubset<T, RelatorioAudienciaDeleteArgs<ExtArgs>>): Prisma__RelatorioAudienciaClient<$Result.GetResult<Prisma.$RelatorioAudienciaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RelatorioAudiencia.
     * @param {RelatorioAudienciaUpdateArgs} args - Arguments to update one RelatorioAudiencia.
     * @example
     * // Update one RelatorioAudiencia
     * const relatorioAudiencia = await prisma.relatorioAudiencia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RelatorioAudienciaUpdateArgs>(args: SelectSubset<T, RelatorioAudienciaUpdateArgs<ExtArgs>>): Prisma__RelatorioAudienciaClient<$Result.GetResult<Prisma.$RelatorioAudienciaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RelatorioAudiencias.
     * @param {RelatorioAudienciaDeleteManyArgs} args - Arguments to filter RelatorioAudiencias to delete.
     * @example
     * // Delete a few RelatorioAudiencias
     * const { count } = await prisma.relatorioAudiencia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RelatorioAudienciaDeleteManyArgs>(args?: SelectSubset<T, RelatorioAudienciaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RelatorioAudiencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelatorioAudienciaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RelatorioAudiencias
     * const relatorioAudiencia = await prisma.relatorioAudiencia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RelatorioAudienciaUpdateManyArgs>(args: SelectSubset<T, RelatorioAudienciaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RelatorioAudiencias and returns the data updated in the database.
     * @param {RelatorioAudienciaUpdateManyAndReturnArgs} args - Arguments to update many RelatorioAudiencias.
     * @example
     * // Update many RelatorioAudiencias
     * const relatorioAudiencia = await prisma.relatorioAudiencia.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RelatorioAudiencias and only return the `id`
     * const relatorioAudienciaWithIdOnly = await prisma.relatorioAudiencia.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RelatorioAudienciaUpdateManyAndReturnArgs>(args: SelectSubset<T, RelatorioAudienciaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RelatorioAudienciaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RelatorioAudiencia.
     * @param {RelatorioAudienciaUpsertArgs} args - Arguments to update or create a RelatorioAudiencia.
     * @example
     * // Update or create a RelatorioAudiencia
     * const relatorioAudiencia = await prisma.relatorioAudiencia.upsert({
     *   create: {
     *     // ... data to create a RelatorioAudiencia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RelatorioAudiencia we want to update
     *   }
     * })
     */
    upsert<T extends RelatorioAudienciaUpsertArgs>(args: SelectSubset<T, RelatorioAudienciaUpsertArgs<ExtArgs>>): Prisma__RelatorioAudienciaClient<$Result.GetResult<Prisma.$RelatorioAudienciaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RelatorioAudiencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelatorioAudienciaCountArgs} args - Arguments to filter RelatorioAudiencias to count.
     * @example
     * // Count the number of RelatorioAudiencias
     * const count = await prisma.relatorioAudiencia.count({
     *   where: {
     *     // ... the filter for the RelatorioAudiencias we want to count
     *   }
     * })
    **/
    count<T extends RelatorioAudienciaCountArgs>(
      args?: Subset<T, RelatorioAudienciaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RelatorioAudienciaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RelatorioAudiencia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelatorioAudienciaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RelatorioAudienciaAggregateArgs>(args: Subset<T, RelatorioAudienciaAggregateArgs>): Prisma.PrismaPromise<GetRelatorioAudienciaAggregateType<T>>

    /**
     * Group by RelatorioAudiencia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelatorioAudienciaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RelatorioAudienciaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RelatorioAudienciaGroupByArgs['orderBy'] }
        : { orderBy?: RelatorioAudienciaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RelatorioAudienciaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRelatorioAudienciaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RelatorioAudiencia model
   */
  readonly fields: RelatorioAudienciaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RelatorioAudiencia.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RelatorioAudienciaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    audiencia<T extends AudienciaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AudienciaDefaultArgs<ExtArgs>>): Prisma__AudienciaClient<$Result.GetResult<Prisma.$AudienciaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RelatorioAudiencia model
   */
  interface RelatorioAudienciaFieldRefs {
    readonly id: FieldRef<"RelatorioAudiencia", 'String'>
    readonly audienciaId: FieldRef<"RelatorioAudiencia", 'String'>
    readonly audienciaOcorreu: FieldRef<"RelatorioAudiencia", 'OcorrenciaAudiencia'>
    readonly resultado: FieldRef<"RelatorioAudiencia", 'ResultadoAudiencia'>
    readonly advogadoPresente: FieldRef<"RelatorioAudiencia", 'Boolean'>
    readonly advogadoDominioCaso: FieldRef<"RelatorioAudiencia", 'Boolean'>
    readonly problemaRelevante: FieldRef<"RelatorioAudiencia", 'Boolean'>
    readonly relato: FieldRef<"RelatorioAudiencia", 'String'>
    readonly createdAt: FieldRef<"RelatorioAudiencia", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RelatorioAudiencia findUnique
   */
  export type RelatorioAudienciaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RelatorioAudiencia
     */
    select?: RelatorioAudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RelatorioAudiencia
     */
    omit?: RelatorioAudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelatorioAudienciaInclude<ExtArgs> | null
    /**
     * Filter, which RelatorioAudiencia to fetch.
     */
    where: RelatorioAudienciaWhereUniqueInput
  }

  /**
   * RelatorioAudiencia findUniqueOrThrow
   */
  export type RelatorioAudienciaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RelatorioAudiencia
     */
    select?: RelatorioAudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RelatorioAudiencia
     */
    omit?: RelatorioAudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelatorioAudienciaInclude<ExtArgs> | null
    /**
     * Filter, which RelatorioAudiencia to fetch.
     */
    where: RelatorioAudienciaWhereUniqueInput
  }

  /**
   * RelatorioAudiencia findFirst
   */
  export type RelatorioAudienciaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RelatorioAudiencia
     */
    select?: RelatorioAudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RelatorioAudiencia
     */
    omit?: RelatorioAudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelatorioAudienciaInclude<ExtArgs> | null
    /**
     * Filter, which RelatorioAudiencia to fetch.
     */
    where?: RelatorioAudienciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RelatorioAudiencias to fetch.
     */
    orderBy?: RelatorioAudienciaOrderByWithRelationInput | RelatorioAudienciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RelatorioAudiencias.
     */
    cursor?: RelatorioAudienciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RelatorioAudiencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RelatorioAudiencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RelatorioAudiencias.
     */
    distinct?: RelatorioAudienciaScalarFieldEnum | RelatorioAudienciaScalarFieldEnum[]
  }

  /**
   * RelatorioAudiencia findFirstOrThrow
   */
  export type RelatorioAudienciaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RelatorioAudiencia
     */
    select?: RelatorioAudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RelatorioAudiencia
     */
    omit?: RelatorioAudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelatorioAudienciaInclude<ExtArgs> | null
    /**
     * Filter, which RelatorioAudiencia to fetch.
     */
    where?: RelatorioAudienciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RelatorioAudiencias to fetch.
     */
    orderBy?: RelatorioAudienciaOrderByWithRelationInput | RelatorioAudienciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RelatorioAudiencias.
     */
    cursor?: RelatorioAudienciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RelatorioAudiencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RelatorioAudiencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RelatorioAudiencias.
     */
    distinct?: RelatorioAudienciaScalarFieldEnum | RelatorioAudienciaScalarFieldEnum[]
  }

  /**
   * RelatorioAudiencia findMany
   */
  export type RelatorioAudienciaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RelatorioAudiencia
     */
    select?: RelatorioAudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RelatorioAudiencia
     */
    omit?: RelatorioAudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelatorioAudienciaInclude<ExtArgs> | null
    /**
     * Filter, which RelatorioAudiencias to fetch.
     */
    where?: RelatorioAudienciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RelatorioAudiencias to fetch.
     */
    orderBy?: RelatorioAudienciaOrderByWithRelationInput | RelatorioAudienciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RelatorioAudiencias.
     */
    cursor?: RelatorioAudienciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RelatorioAudiencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RelatorioAudiencias.
     */
    skip?: number
    distinct?: RelatorioAudienciaScalarFieldEnum | RelatorioAudienciaScalarFieldEnum[]
  }

  /**
   * RelatorioAudiencia create
   */
  export type RelatorioAudienciaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RelatorioAudiencia
     */
    select?: RelatorioAudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RelatorioAudiencia
     */
    omit?: RelatorioAudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelatorioAudienciaInclude<ExtArgs> | null
    /**
     * The data needed to create a RelatorioAudiencia.
     */
    data: XOR<RelatorioAudienciaCreateInput, RelatorioAudienciaUncheckedCreateInput>
  }

  /**
   * RelatorioAudiencia createMany
   */
  export type RelatorioAudienciaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RelatorioAudiencias.
     */
    data: RelatorioAudienciaCreateManyInput | RelatorioAudienciaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RelatorioAudiencia createManyAndReturn
   */
  export type RelatorioAudienciaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RelatorioAudiencia
     */
    select?: RelatorioAudienciaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RelatorioAudiencia
     */
    omit?: RelatorioAudienciaOmit<ExtArgs> | null
    /**
     * The data used to create many RelatorioAudiencias.
     */
    data: RelatorioAudienciaCreateManyInput | RelatorioAudienciaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelatorioAudienciaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RelatorioAudiencia update
   */
  export type RelatorioAudienciaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RelatorioAudiencia
     */
    select?: RelatorioAudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RelatorioAudiencia
     */
    omit?: RelatorioAudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelatorioAudienciaInclude<ExtArgs> | null
    /**
     * The data needed to update a RelatorioAudiencia.
     */
    data: XOR<RelatorioAudienciaUpdateInput, RelatorioAudienciaUncheckedUpdateInput>
    /**
     * Choose, which RelatorioAudiencia to update.
     */
    where: RelatorioAudienciaWhereUniqueInput
  }

  /**
   * RelatorioAudiencia updateMany
   */
  export type RelatorioAudienciaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RelatorioAudiencias.
     */
    data: XOR<RelatorioAudienciaUpdateManyMutationInput, RelatorioAudienciaUncheckedUpdateManyInput>
    /**
     * Filter which RelatorioAudiencias to update
     */
    where?: RelatorioAudienciaWhereInput
    /**
     * Limit how many RelatorioAudiencias to update.
     */
    limit?: number
  }

  /**
   * RelatorioAudiencia updateManyAndReturn
   */
  export type RelatorioAudienciaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RelatorioAudiencia
     */
    select?: RelatorioAudienciaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RelatorioAudiencia
     */
    omit?: RelatorioAudienciaOmit<ExtArgs> | null
    /**
     * The data used to update RelatorioAudiencias.
     */
    data: XOR<RelatorioAudienciaUpdateManyMutationInput, RelatorioAudienciaUncheckedUpdateManyInput>
    /**
     * Filter which RelatorioAudiencias to update
     */
    where?: RelatorioAudienciaWhereInput
    /**
     * Limit how many RelatorioAudiencias to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelatorioAudienciaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RelatorioAudiencia upsert
   */
  export type RelatorioAudienciaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RelatorioAudiencia
     */
    select?: RelatorioAudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RelatorioAudiencia
     */
    omit?: RelatorioAudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelatorioAudienciaInclude<ExtArgs> | null
    /**
     * The filter to search for the RelatorioAudiencia to update in case it exists.
     */
    where: RelatorioAudienciaWhereUniqueInput
    /**
     * In case the RelatorioAudiencia found by the `where` argument doesn't exist, create a new RelatorioAudiencia with this data.
     */
    create: XOR<RelatorioAudienciaCreateInput, RelatorioAudienciaUncheckedCreateInput>
    /**
     * In case the RelatorioAudiencia was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RelatorioAudienciaUpdateInput, RelatorioAudienciaUncheckedUpdateInput>
  }

  /**
   * RelatorioAudiencia delete
   */
  export type RelatorioAudienciaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RelatorioAudiencia
     */
    select?: RelatorioAudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RelatorioAudiencia
     */
    omit?: RelatorioAudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelatorioAudienciaInclude<ExtArgs> | null
    /**
     * Filter which RelatorioAudiencia to delete.
     */
    where: RelatorioAudienciaWhereUniqueInput
  }

  /**
   * RelatorioAudiencia deleteMany
   */
  export type RelatorioAudienciaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RelatorioAudiencias to delete
     */
    where?: RelatorioAudienciaWhereInput
    /**
     * Limit how many RelatorioAudiencias to delete.
     */
    limit?: number
  }

  /**
   * RelatorioAudiencia without action
   */
  export type RelatorioAudienciaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RelatorioAudiencia
     */
    select?: RelatorioAudienciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RelatorioAudiencia
     */
    omit?: RelatorioAudienciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelatorioAudienciaInclude<ExtArgs> | null
  }


  /**
   * Model HistoricoStatus
   */

  export type AggregateHistoricoStatus = {
    _count: HistoricoStatusCountAggregateOutputType | null
    _min: HistoricoStatusMinAggregateOutputType | null
    _max: HistoricoStatusMaxAggregateOutputType | null
  }

  export type HistoricoStatusMinAggregateOutputType = {
    id: string | null
    audienciaId: string | null
    statusAnterior: $Enums.StatusAudiencia | null
    statusNovo: $Enums.StatusAudiencia | null
    motivo: string | null
    atualizadoPor: string | null
    createdAt: Date | null
  }

  export type HistoricoStatusMaxAggregateOutputType = {
    id: string | null
    audienciaId: string | null
    statusAnterior: $Enums.StatusAudiencia | null
    statusNovo: $Enums.StatusAudiencia | null
    motivo: string | null
    atualizadoPor: string | null
    createdAt: Date | null
  }

  export type HistoricoStatusCountAggregateOutputType = {
    id: number
    audienciaId: number
    statusAnterior: number
    statusNovo: number
    motivo: number
    atualizadoPor: number
    createdAt: number
    _all: number
  }


  export type HistoricoStatusMinAggregateInputType = {
    id?: true
    audienciaId?: true
    statusAnterior?: true
    statusNovo?: true
    motivo?: true
    atualizadoPor?: true
    createdAt?: true
  }

  export type HistoricoStatusMaxAggregateInputType = {
    id?: true
    audienciaId?: true
    statusAnterior?: true
    statusNovo?: true
    motivo?: true
    atualizadoPor?: true
    createdAt?: true
  }

  export type HistoricoStatusCountAggregateInputType = {
    id?: true
    audienciaId?: true
    statusAnterior?: true
    statusNovo?: true
    motivo?: true
    atualizadoPor?: true
    createdAt?: true
    _all?: true
  }

  export type HistoricoStatusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HistoricoStatus to aggregate.
     */
    where?: HistoricoStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistoricoStatuses to fetch.
     */
    orderBy?: HistoricoStatusOrderByWithRelationInput | HistoricoStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HistoricoStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistoricoStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistoricoStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HistoricoStatuses
    **/
    _count?: true | HistoricoStatusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HistoricoStatusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HistoricoStatusMaxAggregateInputType
  }

  export type GetHistoricoStatusAggregateType<T extends HistoricoStatusAggregateArgs> = {
        [P in keyof T & keyof AggregateHistoricoStatus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHistoricoStatus[P]>
      : GetScalarType<T[P], AggregateHistoricoStatus[P]>
  }




  export type HistoricoStatusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HistoricoStatusWhereInput
    orderBy?: HistoricoStatusOrderByWithAggregationInput | HistoricoStatusOrderByWithAggregationInput[]
    by: HistoricoStatusScalarFieldEnum[] | HistoricoStatusScalarFieldEnum
    having?: HistoricoStatusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HistoricoStatusCountAggregateInputType | true
    _min?: HistoricoStatusMinAggregateInputType
    _max?: HistoricoStatusMaxAggregateInputType
  }

  export type HistoricoStatusGroupByOutputType = {
    id: string
    audienciaId: string
    statusAnterior: $Enums.StatusAudiencia
    statusNovo: $Enums.StatusAudiencia
    motivo: string | null
    atualizadoPor: string
    createdAt: Date
    _count: HistoricoStatusCountAggregateOutputType | null
    _min: HistoricoStatusMinAggregateOutputType | null
    _max: HistoricoStatusMaxAggregateOutputType | null
  }

  type GetHistoricoStatusGroupByPayload<T extends HistoricoStatusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HistoricoStatusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HistoricoStatusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HistoricoStatusGroupByOutputType[P]>
            : GetScalarType<T[P], HistoricoStatusGroupByOutputType[P]>
        }
      >
    >


  export type HistoricoStatusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    audienciaId?: boolean
    statusAnterior?: boolean
    statusNovo?: boolean
    motivo?: boolean
    atualizadoPor?: boolean
    createdAt?: boolean
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["historicoStatus"]>

  export type HistoricoStatusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    audienciaId?: boolean
    statusAnterior?: boolean
    statusNovo?: boolean
    motivo?: boolean
    atualizadoPor?: boolean
    createdAt?: boolean
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["historicoStatus"]>

  export type HistoricoStatusSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    audienciaId?: boolean
    statusAnterior?: boolean
    statusNovo?: boolean
    motivo?: boolean
    atualizadoPor?: boolean
    createdAt?: boolean
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["historicoStatus"]>

  export type HistoricoStatusSelectScalar = {
    id?: boolean
    audienciaId?: boolean
    statusAnterior?: boolean
    statusNovo?: boolean
    motivo?: boolean
    atualizadoPor?: boolean
    createdAt?: boolean
  }

  export type HistoricoStatusOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "audienciaId" | "statusAnterior" | "statusNovo" | "motivo" | "atualizadoPor" | "createdAt", ExtArgs["result"]["historicoStatus"]>
  export type HistoricoStatusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
  }
  export type HistoricoStatusIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
  }
  export type HistoricoStatusIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
  }

  export type $HistoricoStatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HistoricoStatus"
    objects: {
      audiencia: Prisma.$AudienciaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      audienciaId: string
      statusAnterior: $Enums.StatusAudiencia
      statusNovo: $Enums.StatusAudiencia
      motivo: string | null
      atualizadoPor: string
      createdAt: Date
    }, ExtArgs["result"]["historicoStatus"]>
    composites: {}
  }

  type HistoricoStatusGetPayload<S extends boolean | null | undefined | HistoricoStatusDefaultArgs> = $Result.GetResult<Prisma.$HistoricoStatusPayload, S>

  type HistoricoStatusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HistoricoStatusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HistoricoStatusCountAggregateInputType | true
    }

  export interface HistoricoStatusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HistoricoStatus'], meta: { name: 'HistoricoStatus' } }
    /**
     * Find zero or one HistoricoStatus that matches the filter.
     * @param {HistoricoStatusFindUniqueArgs} args - Arguments to find a HistoricoStatus
     * @example
     * // Get one HistoricoStatus
     * const historicoStatus = await prisma.historicoStatus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HistoricoStatusFindUniqueArgs>(args: SelectSubset<T, HistoricoStatusFindUniqueArgs<ExtArgs>>): Prisma__HistoricoStatusClient<$Result.GetResult<Prisma.$HistoricoStatusPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HistoricoStatus that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HistoricoStatusFindUniqueOrThrowArgs} args - Arguments to find a HistoricoStatus
     * @example
     * // Get one HistoricoStatus
     * const historicoStatus = await prisma.historicoStatus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HistoricoStatusFindUniqueOrThrowArgs>(args: SelectSubset<T, HistoricoStatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HistoricoStatusClient<$Result.GetResult<Prisma.$HistoricoStatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HistoricoStatus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricoStatusFindFirstArgs} args - Arguments to find a HistoricoStatus
     * @example
     * // Get one HistoricoStatus
     * const historicoStatus = await prisma.historicoStatus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HistoricoStatusFindFirstArgs>(args?: SelectSubset<T, HistoricoStatusFindFirstArgs<ExtArgs>>): Prisma__HistoricoStatusClient<$Result.GetResult<Prisma.$HistoricoStatusPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HistoricoStatus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricoStatusFindFirstOrThrowArgs} args - Arguments to find a HistoricoStatus
     * @example
     * // Get one HistoricoStatus
     * const historicoStatus = await prisma.historicoStatus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HistoricoStatusFindFirstOrThrowArgs>(args?: SelectSubset<T, HistoricoStatusFindFirstOrThrowArgs<ExtArgs>>): Prisma__HistoricoStatusClient<$Result.GetResult<Prisma.$HistoricoStatusPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HistoricoStatuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricoStatusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HistoricoStatuses
     * const historicoStatuses = await prisma.historicoStatus.findMany()
     * 
     * // Get first 10 HistoricoStatuses
     * const historicoStatuses = await prisma.historicoStatus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const historicoStatusWithIdOnly = await prisma.historicoStatus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HistoricoStatusFindManyArgs>(args?: SelectSubset<T, HistoricoStatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistoricoStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HistoricoStatus.
     * @param {HistoricoStatusCreateArgs} args - Arguments to create a HistoricoStatus.
     * @example
     * // Create one HistoricoStatus
     * const HistoricoStatus = await prisma.historicoStatus.create({
     *   data: {
     *     // ... data to create a HistoricoStatus
     *   }
     * })
     * 
     */
    create<T extends HistoricoStatusCreateArgs>(args: SelectSubset<T, HistoricoStatusCreateArgs<ExtArgs>>): Prisma__HistoricoStatusClient<$Result.GetResult<Prisma.$HistoricoStatusPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HistoricoStatuses.
     * @param {HistoricoStatusCreateManyArgs} args - Arguments to create many HistoricoStatuses.
     * @example
     * // Create many HistoricoStatuses
     * const historicoStatus = await prisma.historicoStatus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HistoricoStatusCreateManyArgs>(args?: SelectSubset<T, HistoricoStatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HistoricoStatuses and returns the data saved in the database.
     * @param {HistoricoStatusCreateManyAndReturnArgs} args - Arguments to create many HistoricoStatuses.
     * @example
     * // Create many HistoricoStatuses
     * const historicoStatus = await prisma.historicoStatus.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HistoricoStatuses and only return the `id`
     * const historicoStatusWithIdOnly = await prisma.historicoStatus.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HistoricoStatusCreateManyAndReturnArgs>(args?: SelectSubset<T, HistoricoStatusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistoricoStatusPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HistoricoStatus.
     * @param {HistoricoStatusDeleteArgs} args - Arguments to delete one HistoricoStatus.
     * @example
     * // Delete one HistoricoStatus
     * const HistoricoStatus = await prisma.historicoStatus.delete({
     *   where: {
     *     // ... filter to delete one HistoricoStatus
     *   }
     * })
     * 
     */
    delete<T extends HistoricoStatusDeleteArgs>(args: SelectSubset<T, HistoricoStatusDeleteArgs<ExtArgs>>): Prisma__HistoricoStatusClient<$Result.GetResult<Prisma.$HistoricoStatusPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HistoricoStatus.
     * @param {HistoricoStatusUpdateArgs} args - Arguments to update one HistoricoStatus.
     * @example
     * // Update one HistoricoStatus
     * const historicoStatus = await prisma.historicoStatus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HistoricoStatusUpdateArgs>(args: SelectSubset<T, HistoricoStatusUpdateArgs<ExtArgs>>): Prisma__HistoricoStatusClient<$Result.GetResult<Prisma.$HistoricoStatusPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HistoricoStatuses.
     * @param {HistoricoStatusDeleteManyArgs} args - Arguments to filter HistoricoStatuses to delete.
     * @example
     * // Delete a few HistoricoStatuses
     * const { count } = await prisma.historicoStatus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HistoricoStatusDeleteManyArgs>(args?: SelectSubset<T, HistoricoStatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HistoricoStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricoStatusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HistoricoStatuses
     * const historicoStatus = await prisma.historicoStatus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HistoricoStatusUpdateManyArgs>(args: SelectSubset<T, HistoricoStatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HistoricoStatuses and returns the data updated in the database.
     * @param {HistoricoStatusUpdateManyAndReturnArgs} args - Arguments to update many HistoricoStatuses.
     * @example
     * // Update many HistoricoStatuses
     * const historicoStatus = await prisma.historicoStatus.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HistoricoStatuses and only return the `id`
     * const historicoStatusWithIdOnly = await prisma.historicoStatus.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HistoricoStatusUpdateManyAndReturnArgs>(args: SelectSubset<T, HistoricoStatusUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistoricoStatusPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HistoricoStatus.
     * @param {HistoricoStatusUpsertArgs} args - Arguments to update or create a HistoricoStatus.
     * @example
     * // Update or create a HistoricoStatus
     * const historicoStatus = await prisma.historicoStatus.upsert({
     *   create: {
     *     // ... data to create a HistoricoStatus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HistoricoStatus we want to update
     *   }
     * })
     */
    upsert<T extends HistoricoStatusUpsertArgs>(args: SelectSubset<T, HistoricoStatusUpsertArgs<ExtArgs>>): Prisma__HistoricoStatusClient<$Result.GetResult<Prisma.$HistoricoStatusPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HistoricoStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricoStatusCountArgs} args - Arguments to filter HistoricoStatuses to count.
     * @example
     * // Count the number of HistoricoStatuses
     * const count = await prisma.historicoStatus.count({
     *   where: {
     *     // ... the filter for the HistoricoStatuses we want to count
     *   }
     * })
    **/
    count<T extends HistoricoStatusCountArgs>(
      args?: Subset<T, HistoricoStatusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HistoricoStatusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HistoricoStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricoStatusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HistoricoStatusAggregateArgs>(args: Subset<T, HistoricoStatusAggregateArgs>): Prisma.PrismaPromise<GetHistoricoStatusAggregateType<T>>

    /**
     * Group by HistoricoStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricoStatusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HistoricoStatusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HistoricoStatusGroupByArgs['orderBy'] }
        : { orderBy?: HistoricoStatusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HistoricoStatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHistoricoStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HistoricoStatus model
   */
  readonly fields: HistoricoStatusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HistoricoStatus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HistoricoStatusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    audiencia<T extends AudienciaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AudienciaDefaultArgs<ExtArgs>>): Prisma__AudienciaClient<$Result.GetResult<Prisma.$AudienciaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HistoricoStatus model
   */
  interface HistoricoStatusFieldRefs {
    readonly id: FieldRef<"HistoricoStatus", 'String'>
    readonly audienciaId: FieldRef<"HistoricoStatus", 'String'>
    readonly statusAnterior: FieldRef<"HistoricoStatus", 'StatusAudiencia'>
    readonly statusNovo: FieldRef<"HistoricoStatus", 'StatusAudiencia'>
    readonly motivo: FieldRef<"HistoricoStatus", 'String'>
    readonly atualizadoPor: FieldRef<"HistoricoStatus", 'String'>
    readonly createdAt: FieldRef<"HistoricoStatus", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HistoricoStatus findUnique
   */
  export type HistoricoStatusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoStatus
     */
    select?: HistoricoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoricoStatus
     */
    omit?: HistoricoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoStatusInclude<ExtArgs> | null
    /**
     * Filter, which HistoricoStatus to fetch.
     */
    where: HistoricoStatusWhereUniqueInput
  }

  /**
   * HistoricoStatus findUniqueOrThrow
   */
  export type HistoricoStatusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoStatus
     */
    select?: HistoricoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoricoStatus
     */
    omit?: HistoricoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoStatusInclude<ExtArgs> | null
    /**
     * Filter, which HistoricoStatus to fetch.
     */
    where: HistoricoStatusWhereUniqueInput
  }

  /**
   * HistoricoStatus findFirst
   */
  export type HistoricoStatusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoStatus
     */
    select?: HistoricoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoricoStatus
     */
    omit?: HistoricoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoStatusInclude<ExtArgs> | null
    /**
     * Filter, which HistoricoStatus to fetch.
     */
    where?: HistoricoStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistoricoStatuses to fetch.
     */
    orderBy?: HistoricoStatusOrderByWithRelationInput | HistoricoStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HistoricoStatuses.
     */
    cursor?: HistoricoStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistoricoStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistoricoStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HistoricoStatuses.
     */
    distinct?: HistoricoStatusScalarFieldEnum | HistoricoStatusScalarFieldEnum[]
  }

  /**
   * HistoricoStatus findFirstOrThrow
   */
  export type HistoricoStatusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoStatus
     */
    select?: HistoricoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoricoStatus
     */
    omit?: HistoricoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoStatusInclude<ExtArgs> | null
    /**
     * Filter, which HistoricoStatus to fetch.
     */
    where?: HistoricoStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistoricoStatuses to fetch.
     */
    orderBy?: HistoricoStatusOrderByWithRelationInput | HistoricoStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HistoricoStatuses.
     */
    cursor?: HistoricoStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistoricoStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistoricoStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HistoricoStatuses.
     */
    distinct?: HistoricoStatusScalarFieldEnum | HistoricoStatusScalarFieldEnum[]
  }

  /**
   * HistoricoStatus findMany
   */
  export type HistoricoStatusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoStatus
     */
    select?: HistoricoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoricoStatus
     */
    omit?: HistoricoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoStatusInclude<ExtArgs> | null
    /**
     * Filter, which HistoricoStatuses to fetch.
     */
    where?: HistoricoStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistoricoStatuses to fetch.
     */
    orderBy?: HistoricoStatusOrderByWithRelationInput | HistoricoStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HistoricoStatuses.
     */
    cursor?: HistoricoStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistoricoStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistoricoStatuses.
     */
    skip?: number
    distinct?: HistoricoStatusScalarFieldEnum | HistoricoStatusScalarFieldEnum[]
  }

  /**
   * HistoricoStatus create
   */
  export type HistoricoStatusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoStatus
     */
    select?: HistoricoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoricoStatus
     */
    omit?: HistoricoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoStatusInclude<ExtArgs> | null
    /**
     * The data needed to create a HistoricoStatus.
     */
    data: XOR<HistoricoStatusCreateInput, HistoricoStatusUncheckedCreateInput>
  }

  /**
   * HistoricoStatus createMany
   */
  export type HistoricoStatusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HistoricoStatuses.
     */
    data: HistoricoStatusCreateManyInput | HistoricoStatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HistoricoStatus createManyAndReturn
   */
  export type HistoricoStatusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoStatus
     */
    select?: HistoricoStatusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HistoricoStatus
     */
    omit?: HistoricoStatusOmit<ExtArgs> | null
    /**
     * The data used to create many HistoricoStatuses.
     */
    data: HistoricoStatusCreateManyInput | HistoricoStatusCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoStatusIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HistoricoStatus update
   */
  export type HistoricoStatusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoStatus
     */
    select?: HistoricoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoricoStatus
     */
    omit?: HistoricoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoStatusInclude<ExtArgs> | null
    /**
     * The data needed to update a HistoricoStatus.
     */
    data: XOR<HistoricoStatusUpdateInput, HistoricoStatusUncheckedUpdateInput>
    /**
     * Choose, which HistoricoStatus to update.
     */
    where: HistoricoStatusWhereUniqueInput
  }

  /**
   * HistoricoStatus updateMany
   */
  export type HistoricoStatusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HistoricoStatuses.
     */
    data: XOR<HistoricoStatusUpdateManyMutationInput, HistoricoStatusUncheckedUpdateManyInput>
    /**
     * Filter which HistoricoStatuses to update
     */
    where?: HistoricoStatusWhereInput
    /**
     * Limit how many HistoricoStatuses to update.
     */
    limit?: number
  }

  /**
   * HistoricoStatus updateManyAndReturn
   */
  export type HistoricoStatusUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoStatus
     */
    select?: HistoricoStatusSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HistoricoStatus
     */
    omit?: HistoricoStatusOmit<ExtArgs> | null
    /**
     * The data used to update HistoricoStatuses.
     */
    data: XOR<HistoricoStatusUpdateManyMutationInput, HistoricoStatusUncheckedUpdateManyInput>
    /**
     * Filter which HistoricoStatuses to update
     */
    where?: HistoricoStatusWhereInput
    /**
     * Limit how many HistoricoStatuses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoStatusIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HistoricoStatus upsert
   */
  export type HistoricoStatusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoStatus
     */
    select?: HistoricoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoricoStatus
     */
    omit?: HistoricoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoStatusInclude<ExtArgs> | null
    /**
     * The filter to search for the HistoricoStatus to update in case it exists.
     */
    where: HistoricoStatusWhereUniqueInput
    /**
     * In case the HistoricoStatus found by the `where` argument doesn't exist, create a new HistoricoStatus with this data.
     */
    create: XOR<HistoricoStatusCreateInput, HistoricoStatusUncheckedCreateInput>
    /**
     * In case the HistoricoStatus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HistoricoStatusUpdateInput, HistoricoStatusUncheckedUpdateInput>
  }

  /**
   * HistoricoStatus delete
   */
  export type HistoricoStatusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoStatus
     */
    select?: HistoricoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoricoStatus
     */
    omit?: HistoricoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoStatusInclude<ExtArgs> | null
    /**
     * Filter which HistoricoStatus to delete.
     */
    where: HistoricoStatusWhereUniqueInput
  }

  /**
   * HistoricoStatus deleteMany
   */
  export type HistoricoStatusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HistoricoStatuses to delete
     */
    where?: HistoricoStatusWhereInput
    /**
     * Limit how many HistoricoStatuses to delete.
     */
    limit?: number
  }

  /**
   * HistoricoStatus without action
   */
  export type HistoricoStatusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoStatus
     */
    select?: HistoricoStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoricoStatus
     */
    omit?: HistoricoStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoStatusInclude<ExtArgs> | null
  }


  /**
   * Model Substituicao
   */

  export type AggregateSubstituicao = {
    _count: SubstituicaoCountAggregateOutputType | null
    _min: SubstituicaoMinAggregateOutputType | null
    _max: SubstituicaoMaxAggregateOutputType | null
  }

  export type SubstituicaoMinAggregateOutputType = {
    id: string | null
    audienciaId: string | null
    prepostoAnteriorId: string | null
    prepostoNovoId: string | null
    motivo: string | null
    status: $Enums.StatusSubstituicao | null
    createdAt: Date | null
    resolvidoEm: Date | null
  }

  export type SubstituicaoMaxAggregateOutputType = {
    id: string | null
    audienciaId: string | null
    prepostoAnteriorId: string | null
    prepostoNovoId: string | null
    motivo: string | null
    status: $Enums.StatusSubstituicao | null
    createdAt: Date | null
    resolvidoEm: Date | null
  }

  export type SubstituicaoCountAggregateOutputType = {
    id: number
    audienciaId: number
    prepostoAnteriorId: number
    prepostoNovoId: number
    motivo: number
    status: number
    createdAt: number
    resolvidoEm: number
    _all: number
  }


  export type SubstituicaoMinAggregateInputType = {
    id?: true
    audienciaId?: true
    prepostoAnteriorId?: true
    prepostoNovoId?: true
    motivo?: true
    status?: true
    createdAt?: true
    resolvidoEm?: true
  }

  export type SubstituicaoMaxAggregateInputType = {
    id?: true
    audienciaId?: true
    prepostoAnteriorId?: true
    prepostoNovoId?: true
    motivo?: true
    status?: true
    createdAt?: true
    resolvidoEm?: true
  }

  export type SubstituicaoCountAggregateInputType = {
    id?: true
    audienciaId?: true
    prepostoAnteriorId?: true
    prepostoNovoId?: true
    motivo?: true
    status?: true
    createdAt?: true
    resolvidoEm?: true
    _all?: true
  }

  export type SubstituicaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Substituicao to aggregate.
     */
    where?: SubstituicaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Substituicaos to fetch.
     */
    orderBy?: SubstituicaoOrderByWithRelationInput | SubstituicaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubstituicaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Substituicaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Substituicaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Substituicaos
    **/
    _count?: true | SubstituicaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubstituicaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubstituicaoMaxAggregateInputType
  }

  export type GetSubstituicaoAggregateType<T extends SubstituicaoAggregateArgs> = {
        [P in keyof T & keyof AggregateSubstituicao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubstituicao[P]>
      : GetScalarType<T[P], AggregateSubstituicao[P]>
  }




  export type SubstituicaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubstituicaoWhereInput
    orderBy?: SubstituicaoOrderByWithAggregationInput | SubstituicaoOrderByWithAggregationInput[]
    by: SubstituicaoScalarFieldEnum[] | SubstituicaoScalarFieldEnum
    having?: SubstituicaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubstituicaoCountAggregateInputType | true
    _min?: SubstituicaoMinAggregateInputType
    _max?: SubstituicaoMaxAggregateInputType
  }

  export type SubstituicaoGroupByOutputType = {
    id: string
    audienciaId: string
    prepostoAnteriorId: string
    prepostoNovoId: string | null
    motivo: string
    status: $Enums.StatusSubstituicao
    createdAt: Date
    resolvidoEm: Date | null
    _count: SubstituicaoCountAggregateOutputType | null
    _min: SubstituicaoMinAggregateOutputType | null
    _max: SubstituicaoMaxAggregateOutputType | null
  }

  type GetSubstituicaoGroupByPayload<T extends SubstituicaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubstituicaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubstituicaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubstituicaoGroupByOutputType[P]>
            : GetScalarType<T[P], SubstituicaoGroupByOutputType[P]>
        }
      >
    >


  export type SubstituicaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    audienciaId?: boolean
    prepostoAnteriorId?: boolean
    prepostoNovoId?: boolean
    motivo?: boolean
    status?: boolean
    createdAt?: boolean
    resolvidoEm?: boolean
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
    prepostoAnterior?: boolean | PrepostoDefaultArgs<ExtArgs>
    prepostoNovo?: boolean | Substituicao$prepostoNovoArgs<ExtArgs>
  }, ExtArgs["result"]["substituicao"]>

  export type SubstituicaoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    audienciaId?: boolean
    prepostoAnteriorId?: boolean
    prepostoNovoId?: boolean
    motivo?: boolean
    status?: boolean
    createdAt?: boolean
    resolvidoEm?: boolean
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
    prepostoAnterior?: boolean | PrepostoDefaultArgs<ExtArgs>
    prepostoNovo?: boolean | Substituicao$prepostoNovoArgs<ExtArgs>
  }, ExtArgs["result"]["substituicao"]>

  export type SubstituicaoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    audienciaId?: boolean
    prepostoAnteriorId?: boolean
    prepostoNovoId?: boolean
    motivo?: boolean
    status?: boolean
    createdAt?: boolean
    resolvidoEm?: boolean
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
    prepostoAnterior?: boolean | PrepostoDefaultArgs<ExtArgs>
    prepostoNovo?: boolean | Substituicao$prepostoNovoArgs<ExtArgs>
  }, ExtArgs["result"]["substituicao"]>

  export type SubstituicaoSelectScalar = {
    id?: boolean
    audienciaId?: boolean
    prepostoAnteriorId?: boolean
    prepostoNovoId?: boolean
    motivo?: boolean
    status?: boolean
    createdAt?: boolean
    resolvidoEm?: boolean
  }

  export type SubstituicaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "audienciaId" | "prepostoAnteriorId" | "prepostoNovoId" | "motivo" | "status" | "createdAt" | "resolvidoEm", ExtArgs["result"]["substituicao"]>
  export type SubstituicaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
    prepostoAnterior?: boolean | PrepostoDefaultArgs<ExtArgs>
    prepostoNovo?: boolean | Substituicao$prepostoNovoArgs<ExtArgs>
  }
  export type SubstituicaoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
    prepostoAnterior?: boolean | PrepostoDefaultArgs<ExtArgs>
    prepostoNovo?: boolean | Substituicao$prepostoNovoArgs<ExtArgs>
  }
  export type SubstituicaoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audiencia?: boolean | AudienciaDefaultArgs<ExtArgs>
    prepostoAnterior?: boolean | PrepostoDefaultArgs<ExtArgs>
    prepostoNovo?: boolean | Substituicao$prepostoNovoArgs<ExtArgs>
  }

  export type $SubstituicaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Substituicao"
    objects: {
      audiencia: Prisma.$AudienciaPayload<ExtArgs>
      prepostoAnterior: Prisma.$PrepostoPayload<ExtArgs>
      prepostoNovo: Prisma.$PrepostoPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      audienciaId: string
      prepostoAnteriorId: string
      prepostoNovoId: string | null
      motivo: string
      status: $Enums.StatusSubstituicao
      createdAt: Date
      resolvidoEm: Date | null
    }, ExtArgs["result"]["substituicao"]>
    composites: {}
  }

  type SubstituicaoGetPayload<S extends boolean | null | undefined | SubstituicaoDefaultArgs> = $Result.GetResult<Prisma.$SubstituicaoPayload, S>

  type SubstituicaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubstituicaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubstituicaoCountAggregateInputType | true
    }

  export interface SubstituicaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Substituicao'], meta: { name: 'Substituicao' } }
    /**
     * Find zero or one Substituicao that matches the filter.
     * @param {SubstituicaoFindUniqueArgs} args - Arguments to find a Substituicao
     * @example
     * // Get one Substituicao
     * const substituicao = await prisma.substituicao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubstituicaoFindUniqueArgs>(args: SelectSubset<T, SubstituicaoFindUniqueArgs<ExtArgs>>): Prisma__SubstituicaoClient<$Result.GetResult<Prisma.$SubstituicaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Substituicao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubstituicaoFindUniqueOrThrowArgs} args - Arguments to find a Substituicao
     * @example
     * // Get one Substituicao
     * const substituicao = await prisma.substituicao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubstituicaoFindUniqueOrThrowArgs>(args: SelectSubset<T, SubstituicaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubstituicaoClient<$Result.GetResult<Prisma.$SubstituicaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Substituicao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubstituicaoFindFirstArgs} args - Arguments to find a Substituicao
     * @example
     * // Get one Substituicao
     * const substituicao = await prisma.substituicao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubstituicaoFindFirstArgs>(args?: SelectSubset<T, SubstituicaoFindFirstArgs<ExtArgs>>): Prisma__SubstituicaoClient<$Result.GetResult<Prisma.$SubstituicaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Substituicao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubstituicaoFindFirstOrThrowArgs} args - Arguments to find a Substituicao
     * @example
     * // Get one Substituicao
     * const substituicao = await prisma.substituicao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubstituicaoFindFirstOrThrowArgs>(args?: SelectSubset<T, SubstituicaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubstituicaoClient<$Result.GetResult<Prisma.$SubstituicaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Substituicaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubstituicaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Substituicaos
     * const substituicaos = await prisma.substituicao.findMany()
     * 
     * // Get first 10 Substituicaos
     * const substituicaos = await prisma.substituicao.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const substituicaoWithIdOnly = await prisma.substituicao.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubstituicaoFindManyArgs>(args?: SelectSubset<T, SubstituicaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubstituicaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Substituicao.
     * @param {SubstituicaoCreateArgs} args - Arguments to create a Substituicao.
     * @example
     * // Create one Substituicao
     * const Substituicao = await prisma.substituicao.create({
     *   data: {
     *     // ... data to create a Substituicao
     *   }
     * })
     * 
     */
    create<T extends SubstituicaoCreateArgs>(args: SelectSubset<T, SubstituicaoCreateArgs<ExtArgs>>): Prisma__SubstituicaoClient<$Result.GetResult<Prisma.$SubstituicaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Substituicaos.
     * @param {SubstituicaoCreateManyArgs} args - Arguments to create many Substituicaos.
     * @example
     * // Create many Substituicaos
     * const substituicao = await prisma.substituicao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubstituicaoCreateManyArgs>(args?: SelectSubset<T, SubstituicaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Substituicaos and returns the data saved in the database.
     * @param {SubstituicaoCreateManyAndReturnArgs} args - Arguments to create many Substituicaos.
     * @example
     * // Create many Substituicaos
     * const substituicao = await prisma.substituicao.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Substituicaos and only return the `id`
     * const substituicaoWithIdOnly = await prisma.substituicao.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubstituicaoCreateManyAndReturnArgs>(args?: SelectSubset<T, SubstituicaoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubstituicaoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Substituicao.
     * @param {SubstituicaoDeleteArgs} args - Arguments to delete one Substituicao.
     * @example
     * // Delete one Substituicao
     * const Substituicao = await prisma.substituicao.delete({
     *   where: {
     *     // ... filter to delete one Substituicao
     *   }
     * })
     * 
     */
    delete<T extends SubstituicaoDeleteArgs>(args: SelectSubset<T, SubstituicaoDeleteArgs<ExtArgs>>): Prisma__SubstituicaoClient<$Result.GetResult<Prisma.$SubstituicaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Substituicao.
     * @param {SubstituicaoUpdateArgs} args - Arguments to update one Substituicao.
     * @example
     * // Update one Substituicao
     * const substituicao = await prisma.substituicao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubstituicaoUpdateArgs>(args: SelectSubset<T, SubstituicaoUpdateArgs<ExtArgs>>): Prisma__SubstituicaoClient<$Result.GetResult<Prisma.$SubstituicaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Substituicaos.
     * @param {SubstituicaoDeleteManyArgs} args - Arguments to filter Substituicaos to delete.
     * @example
     * // Delete a few Substituicaos
     * const { count } = await prisma.substituicao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubstituicaoDeleteManyArgs>(args?: SelectSubset<T, SubstituicaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Substituicaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubstituicaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Substituicaos
     * const substituicao = await prisma.substituicao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubstituicaoUpdateManyArgs>(args: SelectSubset<T, SubstituicaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Substituicaos and returns the data updated in the database.
     * @param {SubstituicaoUpdateManyAndReturnArgs} args - Arguments to update many Substituicaos.
     * @example
     * // Update many Substituicaos
     * const substituicao = await prisma.substituicao.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Substituicaos and only return the `id`
     * const substituicaoWithIdOnly = await prisma.substituicao.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubstituicaoUpdateManyAndReturnArgs>(args: SelectSubset<T, SubstituicaoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubstituicaoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Substituicao.
     * @param {SubstituicaoUpsertArgs} args - Arguments to update or create a Substituicao.
     * @example
     * // Update or create a Substituicao
     * const substituicao = await prisma.substituicao.upsert({
     *   create: {
     *     // ... data to create a Substituicao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Substituicao we want to update
     *   }
     * })
     */
    upsert<T extends SubstituicaoUpsertArgs>(args: SelectSubset<T, SubstituicaoUpsertArgs<ExtArgs>>): Prisma__SubstituicaoClient<$Result.GetResult<Prisma.$SubstituicaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Substituicaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubstituicaoCountArgs} args - Arguments to filter Substituicaos to count.
     * @example
     * // Count the number of Substituicaos
     * const count = await prisma.substituicao.count({
     *   where: {
     *     // ... the filter for the Substituicaos we want to count
     *   }
     * })
    **/
    count<T extends SubstituicaoCountArgs>(
      args?: Subset<T, SubstituicaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubstituicaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Substituicao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubstituicaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubstituicaoAggregateArgs>(args: Subset<T, SubstituicaoAggregateArgs>): Prisma.PrismaPromise<GetSubstituicaoAggregateType<T>>

    /**
     * Group by Substituicao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubstituicaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubstituicaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubstituicaoGroupByArgs['orderBy'] }
        : { orderBy?: SubstituicaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubstituicaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubstituicaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Substituicao model
   */
  readonly fields: SubstituicaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Substituicao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubstituicaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    audiencia<T extends AudienciaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AudienciaDefaultArgs<ExtArgs>>): Prisma__AudienciaClient<$Result.GetResult<Prisma.$AudienciaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    prepostoAnterior<T extends PrepostoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PrepostoDefaultArgs<ExtArgs>>): Prisma__PrepostoClient<$Result.GetResult<Prisma.$PrepostoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    prepostoNovo<T extends Substituicao$prepostoNovoArgs<ExtArgs> = {}>(args?: Subset<T, Substituicao$prepostoNovoArgs<ExtArgs>>): Prisma__PrepostoClient<$Result.GetResult<Prisma.$PrepostoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Substituicao model
   */
  interface SubstituicaoFieldRefs {
    readonly id: FieldRef<"Substituicao", 'String'>
    readonly audienciaId: FieldRef<"Substituicao", 'String'>
    readonly prepostoAnteriorId: FieldRef<"Substituicao", 'String'>
    readonly prepostoNovoId: FieldRef<"Substituicao", 'String'>
    readonly motivo: FieldRef<"Substituicao", 'String'>
    readonly status: FieldRef<"Substituicao", 'StatusSubstituicao'>
    readonly createdAt: FieldRef<"Substituicao", 'DateTime'>
    readonly resolvidoEm: FieldRef<"Substituicao", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Substituicao findUnique
   */
  export type SubstituicaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Substituicao
     */
    select?: SubstituicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Substituicao
     */
    omit?: SubstituicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubstituicaoInclude<ExtArgs> | null
    /**
     * Filter, which Substituicao to fetch.
     */
    where: SubstituicaoWhereUniqueInput
  }

  /**
   * Substituicao findUniqueOrThrow
   */
  export type SubstituicaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Substituicao
     */
    select?: SubstituicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Substituicao
     */
    omit?: SubstituicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubstituicaoInclude<ExtArgs> | null
    /**
     * Filter, which Substituicao to fetch.
     */
    where: SubstituicaoWhereUniqueInput
  }

  /**
   * Substituicao findFirst
   */
  export type SubstituicaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Substituicao
     */
    select?: SubstituicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Substituicao
     */
    omit?: SubstituicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubstituicaoInclude<ExtArgs> | null
    /**
     * Filter, which Substituicao to fetch.
     */
    where?: SubstituicaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Substituicaos to fetch.
     */
    orderBy?: SubstituicaoOrderByWithRelationInput | SubstituicaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Substituicaos.
     */
    cursor?: SubstituicaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Substituicaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Substituicaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Substituicaos.
     */
    distinct?: SubstituicaoScalarFieldEnum | SubstituicaoScalarFieldEnum[]
  }

  /**
   * Substituicao findFirstOrThrow
   */
  export type SubstituicaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Substituicao
     */
    select?: SubstituicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Substituicao
     */
    omit?: SubstituicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubstituicaoInclude<ExtArgs> | null
    /**
     * Filter, which Substituicao to fetch.
     */
    where?: SubstituicaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Substituicaos to fetch.
     */
    orderBy?: SubstituicaoOrderByWithRelationInput | SubstituicaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Substituicaos.
     */
    cursor?: SubstituicaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Substituicaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Substituicaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Substituicaos.
     */
    distinct?: SubstituicaoScalarFieldEnum | SubstituicaoScalarFieldEnum[]
  }

  /**
   * Substituicao findMany
   */
  export type SubstituicaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Substituicao
     */
    select?: SubstituicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Substituicao
     */
    omit?: SubstituicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubstituicaoInclude<ExtArgs> | null
    /**
     * Filter, which Substituicaos to fetch.
     */
    where?: SubstituicaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Substituicaos to fetch.
     */
    orderBy?: SubstituicaoOrderByWithRelationInput | SubstituicaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Substituicaos.
     */
    cursor?: SubstituicaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Substituicaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Substituicaos.
     */
    skip?: number
    distinct?: SubstituicaoScalarFieldEnum | SubstituicaoScalarFieldEnum[]
  }

  /**
   * Substituicao create
   */
  export type SubstituicaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Substituicao
     */
    select?: SubstituicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Substituicao
     */
    omit?: SubstituicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubstituicaoInclude<ExtArgs> | null
    /**
     * The data needed to create a Substituicao.
     */
    data: XOR<SubstituicaoCreateInput, SubstituicaoUncheckedCreateInput>
  }

  /**
   * Substituicao createMany
   */
  export type SubstituicaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Substituicaos.
     */
    data: SubstituicaoCreateManyInput | SubstituicaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Substituicao createManyAndReturn
   */
  export type SubstituicaoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Substituicao
     */
    select?: SubstituicaoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Substituicao
     */
    omit?: SubstituicaoOmit<ExtArgs> | null
    /**
     * The data used to create many Substituicaos.
     */
    data: SubstituicaoCreateManyInput | SubstituicaoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubstituicaoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Substituicao update
   */
  export type SubstituicaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Substituicao
     */
    select?: SubstituicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Substituicao
     */
    omit?: SubstituicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubstituicaoInclude<ExtArgs> | null
    /**
     * The data needed to update a Substituicao.
     */
    data: XOR<SubstituicaoUpdateInput, SubstituicaoUncheckedUpdateInput>
    /**
     * Choose, which Substituicao to update.
     */
    where: SubstituicaoWhereUniqueInput
  }

  /**
   * Substituicao updateMany
   */
  export type SubstituicaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Substituicaos.
     */
    data: XOR<SubstituicaoUpdateManyMutationInput, SubstituicaoUncheckedUpdateManyInput>
    /**
     * Filter which Substituicaos to update
     */
    where?: SubstituicaoWhereInput
    /**
     * Limit how many Substituicaos to update.
     */
    limit?: number
  }

  /**
   * Substituicao updateManyAndReturn
   */
  export type SubstituicaoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Substituicao
     */
    select?: SubstituicaoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Substituicao
     */
    omit?: SubstituicaoOmit<ExtArgs> | null
    /**
     * The data used to update Substituicaos.
     */
    data: XOR<SubstituicaoUpdateManyMutationInput, SubstituicaoUncheckedUpdateManyInput>
    /**
     * Filter which Substituicaos to update
     */
    where?: SubstituicaoWhereInput
    /**
     * Limit how many Substituicaos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubstituicaoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Substituicao upsert
   */
  export type SubstituicaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Substituicao
     */
    select?: SubstituicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Substituicao
     */
    omit?: SubstituicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubstituicaoInclude<ExtArgs> | null
    /**
     * The filter to search for the Substituicao to update in case it exists.
     */
    where: SubstituicaoWhereUniqueInput
    /**
     * In case the Substituicao found by the `where` argument doesn't exist, create a new Substituicao with this data.
     */
    create: XOR<SubstituicaoCreateInput, SubstituicaoUncheckedCreateInput>
    /**
     * In case the Substituicao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubstituicaoUpdateInput, SubstituicaoUncheckedUpdateInput>
  }

  /**
   * Substituicao delete
   */
  export type SubstituicaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Substituicao
     */
    select?: SubstituicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Substituicao
     */
    omit?: SubstituicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubstituicaoInclude<ExtArgs> | null
    /**
     * Filter which Substituicao to delete.
     */
    where: SubstituicaoWhereUniqueInput
  }

  /**
   * Substituicao deleteMany
   */
  export type SubstituicaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Substituicaos to delete
     */
    where?: SubstituicaoWhereInput
    /**
     * Limit how many Substituicaos to delete.
     */
    limit?: number
  }

  /**
   * Substituicao.prepostoNovo
   */
  export type Substituicao$prepostoNovoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preposto
     */
    select?: PrepostoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preposto
     */
    omit?: PrepostoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrepostoInclude<ExtArgs> | null
    where?: PrepostoWhereInput
  }

  /**
   * Substituicao without action
   */
  export type SubstituicaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Substituicao
     */
    select?: SubstituicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Substituicao
     */
    omit?: SubstituicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubstituicaoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    email: 'email',
    senha: 'senha',
    role: 'role',
    ativo: 'ativo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const TrtScalarFieldEnum: {
    id: 'id',
    numero: 'numero',
    nome: 'nome',
    ativo: 'ativo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TrtScalarFieldEnum = (typeof TrtScalarFieldEnum)[keyof typeof TrtScalarFieldEnum]


  export const PrepostoScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    telefoneWhatsapp: 'telefoneWhatsapp',
    email: 'email',
    cpf: 'cpf',
    ativo: 'ativo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PrepostoScalarFieldEnum = (typeof PrepostoScalarFieldEnum)[keyof typeof PrepostoScalarFieldEnum]


  export const ParceiroScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    ativo: 'ativo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ParceiroScalarFieldEnum = (typeof ParceiroScalarFieldEnum)[keyof typeof ParceiroScalarFieldEnum]


  export const ContatoParceiroScalarFieldEnum: {
    id: 'id',
    parceiroId: 'parceiroId',
    nome: 'nome',
    telefoneWhatsapp: 'telefoneWhatsapp',
    email: 'email',
    cargo: 'cargo',
    ordemEscalonamento: 'ordemEscalonamento',
    createdAt: 'createdAt'
  };

  export type ContatoParceiroScalarFieldEnum = (typeof ContatoParceiroScalarFieldEnum)[keyof typeof ContatoParceiroScalarFieldEnum]


  export const ImportacaoScalarFieldEnum: {
    id: 'id',
    nomeArquivo: 'nomeArquivo',
    totalRegistros: 'totalRegistros',
    registrosImportados: 'registrosImportados',
    registrosIgnorados: 'registrosIgnorados',
    mapeamentoColunas: 'mapeamentoColunas',
    status: 'status',
    erros: 'erros',
    createdAt: 'createdAt'
  };

  export type ImportacaoScalarFieldEnum = (typeof ImportacaoScalarFieldEnum)[keyof typeof ImportacaoScalarFieldEnum]


  export const AudienciaScalarFieldEnum: {
    id: 'id',
    numeroProcesso: 'numeroProcesso',
    reclamante: 'reclamante',
    data: 'data',
    hora: 'hora',
    modalidade: 'modalidade',
    local: 'local',
    link: 'link',
    trtId: 'trtId',
    vara: 'vara',
    status: 'status',
    prepostoId: 'prepostoId',
    parceiroId: 'parceiroId',
    importacaoId: 'importacaoId',
    observacoes: 'observacoes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AudienciaScalarFieldEnum = (typeof AudienciaScalarFieldEnum)[keyof typeof AudienciaScalarFieldEnum]


  export const MensagemScalarFieldEnum: {
    id: 'id',
    audienciaId: 'audienciaId',
    prepostoId: 'prepostoId',
    contatoParceiroId: 'contatoParceiroId',
    tipo: 'tipo',
    direcao: 'direcao',
    conteudo: 'conteudo',
    respostaBotao: 'respostaBotao',
    observacao: 'observacao',
    whatsappMessageId: 'whatsappMessageId',
    statusEnvio: 'statusEnvio',
    createdAt: 'createdAt'
  };

  export type MensagemScalarFieldEnum = (typeof MensagemScalarFieldEnum)[keyof typeof MensagemScalarFieldEnum]


  export const RelatorioAudienciaScalarFieldEnum: {
    id: 'id',
    audienciaId: 'audienciaId',
    audienciaOcorreu: 'audienciaOcorreu',
    resultado: 'resultado',
    advogadoPresente: 'advogadoPresente',
    advogadoDominioCaso: 'advogadoDominioCaso',
    problemaRelevante: 'problemaRelevante',
    relato: 'relato',
    createdAt: 'createdAt'
  };

  export type RelatorioAudienciaScalarFieldEnum = (typeof RelatorioAudienciaScalarFieldEnum)[keyof typeof RelatorioAudienciaScalarFieldEnum]


  export const HistoricoStatusScalarFieldEnum: {
    id: 'id',
    audienciaId: 'audienciaId',
    statusAnterior: 'statusAnterior',
    statusNovo: 'statusNovo',
    motivo: 'motivo',
    atualizadoPor: 'atualizadoPor',
    createdAt: 'createdAt'
  };

  export type HistoricoStatusScalarFieldEnum = (typeof HistoricoStatusScalarFieldEnum)[keyof typeof HistoricoStatusScalarFieldEnum]


  export const SubstituicaoScalarFieldEnum: {
    id: 'id',
    audienciaId: 'audienciaId',
    prepostoAnteriorId: 'prepostoAnteriorId',
    prepostoNovoId: 'prepostoNovoId',
    motivo: 'motivo',
    status: 'status',
    createdAt: 'createdAt',
    resolvidoEm: 'resolvidoEm'
  };

  export type SubstituicaoScalarFieldEnum = (typeof SubstituicaoScalarFieldEnum)[keyof typeof SubstituicaoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'RoleUsuario'
   */
  export type EnumRoleUsuarioFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoleUsuario'>
    


  /**
   * Reference to a field of type 'RoleUsuario[]'
   */
  export type ListEnumRoleUsuarioFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoleUsuario[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'StatusImportacao'
   */
  export type EnumStatusImportacaoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusImportacao'>
    


  /**
   * Reference to a field of type 'StatusImportacao[]'
   */
  export type ListEnumStatusImportacaoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusImportacao[]'>
    


  /**
   * Reference to a field of type 'Modalidade'
   */
  export type EnumModalidadeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Modalidade'>
    


  /**
   * Reference to a field of type 'Modalidade[]'
   */
  export type ListEnumModalidadeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Modalidade[]'>
    


  /**
   * Reference to a field of type 'StatusAudiencia'
   */
  export type EnumStatusAudienciaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusAudiencia'>
    


  /**
   * Reference to a field of type 'StatusAudiencia[]'
   */
  export type ListEnumStatusAudienciaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusAudiencia[]'>
    


  /**
   * Reference to a field of type 'TipoMensagem'
   */
  export type EnumTipoMensagemFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoMensagem'>
    


  /**
   * Reference to a field of type 'TipoMensagem[]'
   */
  export type ListEnumTipoMensagemFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoMensagem[]'>
    


  /**
   * Reference to a field of type 'DirecaoMensagem'
   */
  export type EnumDirecaoMensagemFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DirecaoMensagem'>
    


  /**
   * Reference to a field of type 'DirecaoMensagem[]'
   */
  export type ListEnumDirecaoMensagemFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DirecaoMensagem[]'>
    


  /**
   * Reference to a field of type 'StatusEnvioMensagem'
   */
  export type EnumStatusEnvioMensagemFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusEnvioMensagem'>
    


  /**
   * Reference to a field of type 'StatusEnvioMensagem[]'
   */
  export type ListEnumStatusEnvioMensagemFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusEnvioMensagem[]'>
    


  /**
   * Reference to a field of type 'OcorrenciaAudiencia'
   */
  export type EnumOcorrenciaAudienciaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OcorrenciaAudiencia'>
    


  /**
   * Reference to a field of type 'OcorrenciaAudiencia[]'
   */
  export type ListEnumOcorrenciaAudienciaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OcorrenciaAudiencia[]'>
    


  /**
   * Reference to a field of type 'ResultadoAudiencia'
   */
  export type EnumResultadoAudienciaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResultadoAudiencia'>
    


  /**
   * Reference to a field of type 'ResultadoAudiencia[]'
   */
  export type ListEnumResultadoAudienciaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResultadoAudiencia[]'>
    


  /**
   * Reference to a field of type 'StatusSubstituicao'
   */
  export type EnumStatusSubstituicaoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusSubstituicao'>
    


  /**
   * Reference to a field of type 'StatusSubstituicao[]'
   */
  export type ListEnumStatusSubstituicaoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusSubstituicao[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: StringFilter<"Usuario"> | string
    nome?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    senha?: StringFilter<"Usuario"> | string
    role?: EnumRoleUsuarioFilter<"Usuario"> | $Enums.RoleUsuario
    ativo?: BoolFilter<"Usuario"> | boolean
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeFilter<"Usuario"> | Date | string
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    nome?: StringFilter<"Usuario"> | string
    senha?: StringFilter<"Usuario"> | string
    role?: EnumRoleUsuarioFilter<"Usuario"> | $Enums.RoleUsuario
    ativo?: BoolFilter<"Usuario"> | boolean
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeFilter<"Usuario"> | Date | string
  }, "id" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Usuario"> | string
    nome?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    senha?: StringWithAggregatesFilter<"Usuario"> | string
    role?: EnumRoleUsuarioWithAggregatesFilter<"Usuario"> | $Enums.RoleUsuario
    ativo?: BoolWithAggregatesFilter<"Usuario"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
  }

  export type TrtWhereInput = {
    AND?: TrtWhereInput | TrtWhereInput[]
    OR?: TrtWhereInput[]
    NOT?: TrtWhereInput | TrtWhereInput[]
    id?: StringFilter<"Trt"> | string
    numero?: StringFilter<"Trt"> | string
    nome?: StringFilter<"Trt"> | string
    ativo?: BoolFilter<"Trt"> | boolean
    createdAt?: DateTimeFilter<"Trt"> | Date | string
    updatedAt?: DateTimeFilter<"Trt"> | Date | string
    audiencias?: AudienciaListRelationFilter
  }

  export type TrtOrderByWithRelationInput = {
    id?: SortOrder
    numero?: SortOrder
    nome?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    audiencias?: AudienciaOrderByRelationAggregateInput
  }

  export type TrtWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    numero?: string
    AND?: TrtWhereInput | TrtWhereInput[]
    OR?: TrtWhereInput[]
    NOT?: TrtWhereInput | TrtWhereInput[]
    nome?: StringFilter<"Trt"> | string
    ativo?: BoolFilter<"Trt"> | boolean
    createdAt?: DateTimeFilter<"Trt"> | Date | string
    updatedAt?: DateTimeFilter<"Trt"> | Date | string
    audiencias?: AudienciaListRelationFilter
  }, "id" | "numero">

  export type TrtOrderByWithAggregationInput = {
    id?: SortOrder
    numero?: SortOrder
    nome?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TrtCountOrderByAggregateInput
    _max?: TrtMaxOrderByAggregateInput
    _min?: TrtMinOrderByAggregateInput
  }

  export type TrtScalarWhereWithAggregatesInput = {
    AND?: TrtScalarWhereWithAggregatesInput | TrtScalarWhereWithAggregatesInput[]
    OR?: TrtScalarWhereWithAggregatesInput[]
    NOT?: TrtScalarWhereWithAggregatesInput | TrtScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Trt"> | string
    numero?: StringWithAggregatesFilter<"Trt"> | string
    nome?: StringWithAggregatesFilter<"Trt"> | string
    ativo?: BoolWithAggregatesFilter<"Trt"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Trt"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Trt"> | Date | string
  }

  export type PrepostoWhereInput = {
    AND?: PrepostoWhereInput | PrepostoWhereInput[]
    OR?: PrepostoWhereInput[]
    NOT?: PrepostoWhereInput | PrepostoWhereInput[]
    id?: StringFilter<"Preposto"> | string
    nome?: StringFilter<"Preposto"> | string
    telefoneWhatsapp?: StringFilter<"Preposto"> | string
    email?: StringNullableFilter<"Preposto"> | string | null
    cpf?: StringNullableFilter<"Preposto"> | string | null
    ativo?: BoolFilter<"Preposto"> | boolean
    createdAt?: DateTimeFilter<"Preposto"> | Date | string
    updatedAt?: DateTimeFilter<"Preposto"> | Date | string
    audiencias?: AudienciaListRelationFilter
    mensagens?: MensagemListRelationFilter
    substituicoesAnterior?: SubstituicaoListRelationFilter
    substituicoesNovo?: SubstituicaoListRelationFilter
  }

  export type PrepostoOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    telefoneWhatsapp?: SortOrder
    email?: SortOrderInput | SortOrder
    cpf?: SortOrderInput | SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    audiencias?: AudienciaOrderByRelationAggregateInput
    mensagens?: MensagemOrderByRelationAggregateInput
    substituicoesAnterior?: SubstituicaoOrderByRelationAggregateInput
    substituicoesNovo?: SubstituicaoOrderByRelationAggregateInput
  }

  export type PrepostoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    telefoneWhatsapp?: string
    AND?: PrepostoWhereInput | PrepostoWhereInput[]
    OR?: PrepostoWhereInput[]
    NOT?: PrepostoWhereInput | PrepostoWhereInput[]
    nome?: StringFilter<"Preposto"> | string
    email?: StringNullableFilter<"Preposto"> | string | null
    cpf?: StringNullableFilter<"Preposto"> | string | null
    ativo?: BoolFilter<"Preposto"> | boolean
    createdAt?: DateTimeFilter<"Preposto"> | Date | string
    updatedAt?: DateTimeFilter<"Preposto"> | Date | string
    audiencias?: AudienciaListRelationFilter
    mensagens?: MensagemListRelationFilter
    substituicoesAnterior?: SubstituicaoListRelationFilter
    substituicoesNovo?: SubstituicaoListRelationFilter
  }, "id" | "telefoneWhatsapp">

  export type PrepostoOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    telefoneWhatsapp?: SortOrder
    email?: SortOrderInput | SortOrder
    cpf?: SortOrderInput | SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PrepostoCountOrderByAggregateInput
    _max?: PrepostoMaxOrderByAggregateInput
    _min?: PrepostoMinOrderByAggregateInput
  }

  export type PrepostoScalarWhereWithAggregatesInput = {
    AND?: PrepostoScalarWhereWithAggregatesInput | PrepostoScalarWhereWithAggregatesInput[]
    OR?: PrepostoScalarWhereWithAggregatesInput[]
    NOT?: PrepostoScalarWhereWithAggregatesInput | PrepostoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Preposto"> | string
    nome?: StringWithAggregatesFilter<"Preposto"> | string
    telefoneWhatsapp?: StringWithAggregatesFilter<"Preposto"> | string
    email?: StringNullableWithAggregatesFilter<"Preposto"> | string | null
    cpf?: StringNullableWithAggregatesFilter<"Preposto"> | string | null
    ativo?: BoolWithAggregatesFilter<"Preposto"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Preposto"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Preposto"> | Date | string
  }

  export type ParceiroWhereInput = {
    AND?: ParceiroWhereInput | ParceiroWhereInput[]
    OR?: ParceiroWhereInput[]
    NOT?: ParceiroWhereInput | ParceiroWhereInput[]
    id?: StringFilter<"Parceiro"> | string
    nome?: StringFilter<"Parceiro"> | string
    ativo?: BoolFilter<"Parceiro"> | boolean
    createdAt?: DateTimeFilter<"Parceiro"> | Date | string
    updatedAt?: DateTimeFilter<"Parceiro"> | Date | string
    contatos?: ContatoParceiroListRelationFilter
    audiencias?: AudienciaListRelationFilter
  }

  export type ParceiroOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    contatos?: ContatoParceiroOrderByRelationAggregateInput
    audiencias?: AudienciaOrderByRelationAggregateInput
  }

  export type ParceiroWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ParceiroWhereInput | ParceiroWhereInput[]
    OR?: ParceiroWhereInput[]
    NOT?: ParceiroWhereInput | ParceiroWhereInput[]
    nome?: StringFilter<"Parceiro"> | string
    ativo?: BoolFilter<"Parceiro"> | boolean
    createdAt?: DateTimeFilter<"Parceiro"> | Date | string
    updatedAt?: DateTimeFilter<"Parceiro"> | Date | string
    contatos?: ContatoParceiroListRelationFilter
    audiencias?: AudienciaListRelationFilter
  }, "id">

  export type ParceiroOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ParceiroCountOrderByAggregateInput
    _max?: ParceiroMaxOrderByAggregateInput
    _min?: ParceiroMinOrderByAggregateInput
  }

  export type ParceiroScalarWhereWithAggregatesInput = {
    AND?: ParceiroScalarWhereWithAggregatesInput | ParceiroScalarWhereWithAggregatesInput[]
    OR?: ParceiroScalarWhereWithAggregatesInput[]
    NOT?: ParceiroScalarWhereWithAggregatesInput | ParceiroScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Parceiro"> | string
    nome?: StringWithAggregatesFilter<"Parceiro"> | string
    ativo?: BoolWithAggregatesFilter<"Parceiro"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Parceiro"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Parceiro"> | Date | string
  }

  export type ContatoParceiroWhereInput = {
    AND?: ContatoParceiroWhereInput | ContatoParceiroWhereInput[]
    OR?: ContatoParceiroWhereInput[]
    NOT?: ContatoParceiroWhereInput | ContatoParceiroWhereInput[]
    id?: StringFilter<"ContatoParceiro"> | string
    parceiroId?: StringFilter<"ContatoParceiro"> | string
    nome?: StringFilter<"ContatoParceiro"> | string
    telefoneWhatsapp?: StringFilter<"ContatoParceiro"> | string
    email?: StringNullableFilter<"ContatoParceiro"> | string | null
    cargo?: StringNullableFilter<"ContatoParceiro"> | string | null
    ordemEscalonamento?: IntFilter<"ContatoParceiro"> | number
    createdAt?: DateTimeFilter<"ContatoParceiro"> | Date | string
    parceiro?: XOR<ParceiroScalarRelationFilter, ParceiroWhereInput>
    mensagens?: MensagemListRelationFilter
  }

  export type ContatoParceiroOrderByWithRelationInput = {
    id?: SortOrder
    parceiroId?: SortOrder
    nome?: SortOrder
    telefoneWhatsapp?: SortOrder
    email?: SortOrderInput | SortOrder
    cargo?: SortOrderInput | SortOrder
    ordemEscalonamento?: SortOrder
    createdAt?: SortOrder
    parceiro?: ParceiroOrderByWithRelationInput
    mensagens?: MensagemOrderByRelationAggregateInput
  }

  export type ContatoParceiroWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContatoParceiroWhereInput | ContatoParceiroWhereInput[]
    OR?: ContatoParceiroWhereInput[]
    NOT?: ContatoParceiroWhereInput | ContatoParceiroWhereInput[]
    parceiroId?: StringFilter<"ContatoParceiro"> | string
    nome?: StringFilter<"ContatoParceiro"> | string
    telefoneWhatsapp?: StringFilter<"ContatoParceiro"> | string
    email?: StringNullableFilter<"ContatoParceiro"> | string | null
    cargo?: StringNullableFilter<"ContatoParceiro"> | string | null
    ordemEscalonamento?: IntFilter<"ContatoParceiro"> | number
    createdAt?: DateTimeFilter<"ContatoParceiro"> | Date | string
    parceiro?: XOR<ParceiroScalarRelationFilter, ParceiroWhereInput>
    mensagens?: MensagemListRelationFilter
  }, "id">

  export type ContatoParceiroOrderByWithAggregationInput = {
    id?: SortOrder
    parceiroId?: SortOrder
    nome?: SortOrder
    telefoneWhatsapp?: SortOrder
    email?: SortOrderInput | SortOrder
    cargo?: SortOrderInput | SortOrder
    ordemEscalonamento?: SortOrder
    createdAt?: SortOrder
    _count?: ContatoParceiroCountOrderByAggregateInput
    _avg?: ContatoParceiroAvgOrderByAggregateInput
    _max?: ContatoParceiroMaxOrderByAggregateInput
    _min?: ContatoParceiroMinOrderByAggregateInput
    _sum?: ContatoParceiroSumOrderByAggregateInput
  }

  export type ContatoParceiroScalarWhereWithAggregatesInput = {
    AND?: ContatoParceiroScalarWhereWithAggregatesInput | ContatoParceiroScalarWhereWithAggregatesInput[]
    OR?: ContatoParceiroScalarWhereWithAggregatesInput[]
    NOT?: ContatoParceiroScalarWhereWithAggregatesInput | ContatoParceiroScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ContatoParceiro"> | string
    parceiroId?: StringWithAggregatesFilter<"ContatoParceiro"> | string
    nome?: StringWithAggregatesFilter<"ContatoParceiro"> | string
    telefoneWhatsapp?: StringWithAggregatesFilter<"ContatoParceiro"> | string
    email?: StringNullableWithAggregatesFilter<"ContatoParceiro"> | string | null
    cargo?: StringNullableWithAggregatesFilter<"ContatoParceiro"> | string | null
    ordemEscalonamento?: IntWithAggregatesFilter<"ContatoParceiro"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ContatoParceiro"> | Date | string
  }

  export type ImportacaoWhereInput = {
    AND?: ImportacaoWhereInput | ImportacaoWhereInput[]
    OR?: ImportacaoWhereInput[]
    NOT?: ImportacaoWhereInput | ImportacaoWhereInput[]
    id?: StringFilter<"Importacao"> | string
    nomeArquivo?: StringFilter<"Importacao"> | string
    totalRegistros?: IntFilter<"Importacao"> | number
    registrosImportados?: IntFilter<"Importacao"> | number
    registrosIgnorados?: IntFilter<"Importacao"> | number
    mapeamentoColunas?: JsonNullableFilter<"Importacao">
    status?: EnumStatusImportacaoFilter<"Importacao"> | $Enums.StatusImportacao
    erros?: JsonNullableFilter<"Importacao">
    createdAt?: DateTimeFilter<"Importacao"> | Date | string
    audiencias?: AudienciaListRelationFilter
  }

  export type ImportacaoOrderByWithRelationInput = {
    id?: SortOrder
    nomeArquivo?: SortOrder
    totalRegistros?: SortOrder
    registrosImportados?: SortOrder
    registrosIgnorados?: SortOrder
    mapeamentoColunas?: SortOrderInput | SortOrder
    status?: SortOrder
    erros?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    audiencias?: AudienciaOrderByRelationAggregateInput
  }

  export type ImportacaoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ImportacaoWhereInput | ImportacaoWhereInput[]
    OR?: ImportacaoWhereInput[]
    NOT?: ImportacaoWhereInput | ImportacaoWhereInput[]
    nomeArquivo?: StringFilter<"Importacao"> | string
    totalRegistros?: IntFilter<"Importacao"> | number
    registrosImportados?: IntFilter<"Importacao"> | number
    registrosIgnorados?: IntFilter<"Importacao"> | number
    mapeamentoColunas?: JsonNullableFilter<"Importacao">
    status?: EnumStatusImportacaoFilter<"Importacao"> | $Enums.StatusImportacao
    erros?: JsonNullableFilter<"Importacao">
    createdAt?: DateTimeFilter<"Importacao"> | Date | string
    audiencias?: AudienciaListRelationFilter
  }, "id">

  export type ImportacaoOrderByWithAggregationInput = {
    id?: SortOrder
    nomeArquivo?: SortOrder
    totalRegistros?: SortOrder
    registrosImportados?: SortOrder
    registrosIgnorados?: SortOrder
    mapeamentoColunas?: SortOrderInput | SortOrder
    status?: SortOrder
    erros?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ImportacaoCountOrderByAggregateInput
    _avg?: ImportacaoAvgOrderByAggregateInput
    _max?: ImportacaoMaxOrderByAggregateInput
    _min?: ImportacaoMinOrderByAggregateInput
    _sum?: ImportacaoSumOrderByAggregateInput
  }

  export type ImportacaoScalarWhereWithAggregatesInput = {
    AND?: ImportacaoScalarWhereWithAggregatesInput | ImportacaoScalarWhereWithAggregatesInput[]
    OR?: ImportacaoScalarWhereWithAggregatesInput[]
    NOT?: ImportacaoScalarWhereWithAggregatesInput | ImportacaoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Importacao"> | string
    nomeArquivo?: StringWithAggregatesFilter<"Importacao"> | string
    totalRegistros?: IntWithAggregatesFilter<"Importacao"> | number
    registrosImportados?: IntWithAggregatesFilter<"Importacao"> | number
    registrosIgnorados?: IntWithAggregatesFilter<"Importacao"> | number
    mapeamentoColunas?: JsonNullableWithAggregatesFilter<"Importacao">
    status?: EnumStatusImportacaoWithAggregatesFilter<"Importacao"> | $Enums.StatusImportacao
    erros?: JsonNullableWithAggregatesFilter<"Importacao">
    createdAt?: DateTimeWithAggregatesFilter<"Importacao"> | Date | string
  }

  export type AudienciaWhereInput = {
    AND?: AudienciaWhereInput | AudienciaWhereInput[]
    OR?: AudienciaWhereInput[]
    NOT?: AudienciaWhereInput | AudienciaWhereInput[]
    id?: StringFilter<"Audiencia"> | string
    numeroProcesso?: StringFilter<"Audiencia"> | string
    reclamante?: StringNullableFilter<"Audiencia"> | string | null
    data?: DateTimeFilter<"Audiencia"> | Date | string
    hora?: StringFilter<"Audiencia"> | string
    modalidade?: EnumModalidadeFilter<"Audiencia"> | $Enums.Modalidade
    local?: StringNullableFilter<"Audiencia"> | string | null
    link?: StringNullableFilter<"Audiencia"> | string | null
    trtId?: StringFilter<"Audiencia"> | string
    vara?: StringNullableFilter<"Audiencia"> | string | null
    status?: EnumStatusAudienciaFilter<"Audiencia"> | $Enums.StatusAudiencia
    prepostoId?: StringFilter<"Audiencia"> | string
    parceiroId?: StringFilter<"Audiencia"> | string
    importacaoId?: StringNullableFilter<"Audiencia"> | string | null
    observacoes?: StringNullableFilter<"Audiencia"> | string | null
    createdAt?: DateTimeFilter<"Audiencia"> | Date | string
    updatedAt?: DateTimeFilter<"Audiencia"> | Date | string
    trt?: XOR<TrtScalarRelationFilter, TrtWhereInput>
    preposto?: XOR<PrepostoScalarRelationFilter, PrepostoWhereInput>
    parceiro?: XOR<ParceiroScalarRelationFilter, ParceiroWhereInput>
    importacao?: XOR<ImportacaoNullableScalarRelationFilter, ImportacaoWhereInput> | null
    mensagens?: MensagemListRelationFilter
    historicoStatus?: HistoricoStatusListRelationFilter
    relatorio?: XOR<RelatorioAudienciaNullableScalarRelationFilter, RelatorioAudienciaWhereInput> | null
    substituicoes?: SubstituicaoListRelationFilter
  }

  export type AudienciaOrderByWithRelationInput = {
    id?: SortOrder
    numeroProcesso?: SortOrder
    reclamante?: SortOrderInput | SortOrder
    data?: SortOrder
    hora?: SortOrder
    modalidade?: SortOrder
    local?: SortOrderInput | SortOrder
    link?: SortOrderInput | SortOrder
    trtId?: SortOrder
    vara?: SortOrderInput | SortOrder
    status?: SortOrder
    prepostoId?: SortOrder
    parceiroId?: SortOrder
    importacaoId?: SortOrderInput | SortOrder
    observacoes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trt?: TrtOrderByWithRelationInput
    preposto?: PrepostoOrderByWithRelationInput
    parceiro?: ParceiroOrderByWithRelationInput
    importacao?: ImportacaoOrderByWithRelationInput
    mensagens?: MensagemOrderByRelationAggregateInput
    historicoStatus?: HistoricoStatusOrderByRelationAggregateInput
    relatorio?: RelatorioAudienciaOrderByWithRelationInput
    substituicoes?: SubstituicaoOrderByRelationAggregateInput
  }

  export type AudienciaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AudienciaWhereInput | AudienciaWhereInput[]
    OR?: AudienciaWhereInput[]
    NOT?: AudienciaWhereInput | AudienciaWhereInput[]
    numeroProcesso?: StringFilter<"Audiencia"> | string
    reclamante?: StringNullableFilter<"Audiencia"> | string | null
    data?: DateTimeFilter<"Audiencia"> | Date | string
    hora?: StringFilter<"Audiencia"> | string
    modalidade?: EnumModalidadeFilter<"Audiencia"> | $Enums.Modalidade
    local?: StringNullableFilter<"Audiencia"> | string | null
    link?: StringNullableFilter<"Audiencia"> | string | null
    trtId?: StringFilter<"Audiencia"> | string
    vara?: StringNullableFilter<"Audiencia"> | string | null
    status?: EnumStatusAudienciaFilter<"Audiencia"> | $Enums.StatusAudiencia
    prepostoId?: StringFilter<"Audiencia"> | string
    parceiroId?: StringFilter<"Audiencia"> | string
    importacaoId?: StringNullableFilter<"Audiencia"> | string | null
    observacoes?: StringNullableFilter<"Audiencia"> | string | null
    createdAt?: DateTimeFilter<"Audiencia"> | Date | string
    updatedAt?: DateTimeFilter<"Audiencia"> | Date | string
    trt?: XOR<TrtScalarRelationFilter, TrtWhereInput>
    preposto?: XOR<PrepostoScalarRelationFilter, PrepostoWhereInput>
    parceiro?: XOR<ParceiroScalarRelationFilter, ParceiroWhereInput>
    importacao?: XOR<ImportacaoNullableScalarRelationFilter, ImportacaoWhereInput> | null
    mensagens?: MensagemListRelationFilter
    historicoStatus?: HistoricoStatusListRelationFilter
    relatorio?: XOR<RelatorioAudienciaNullableScalarRelationFilter, RelatorioAudienciaWhereInput> | null
    substituicoes?: SubstituicaoListRelationFilter
  }, "id">

  export type AudienciaOrderByWithAggregationInput = {
    id?: SortOrder
    numeroProcesso?: SortOrder
    reclamante?: SortOrderInput | SortOrder
    data?: SortOrder
    hora?: SortOrder
    modalidade?: SortOrder
    local?: SortOrderInput | SortOrder
    link?: SortOrderInput | SortOrder
    trtId?: SortOrder
    vara?: SortOrderInput | SortOrder
    status?: SortOrder
    prepostoId?: SortOrder
    parceiroId?: SortOrder
    importacaoId?: SortOrderInput | SortOrder
    observacoes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AudienciaCountOrderByAggregateInput
    _max?: AudienciaMaxOrderByAggregateInput
    _min?: AudienciaMinOrderByAggregateInput
  }

  export type AudienciaScalarWhereWithAggregatesInput = {
    AND?: AudienciaScalarWhereWithAggregatesInput | AudienciaScalarWhereWithAggregatesInput[]
    OR?: AudienciaScalarWhereWithAggregatesInput[]
    NOT?: AudienciaScalarWhereWithAggregatesInput | AudienciaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Audiencia"> | string
    numeroProcesso?: StringWithAggregatesFilter<"Audiencia"> | string
    reclamante?: StringNullableWithAggregatesFilter<"Audiencia"> | string | null
    data?: DateTimeWithAggregatesFilter<"Audiencia"> | Date | string
    hora?: StringWithAggregatesFilter<"Audiencia"> | string
    modalidade?: EnumModalidadeWithAggregatesFilter<"Audiencia"> | $Enums.Modalidade
    local?: StringNullableWithAggregatesFilter<"Audiencia"> | string | null
    link?: StringNullableWithAggregatesFilter<"Audiencia"> | string | null
    trtId?: StringWithAggregatesFilter<"Audiencia"> | string
    vara?: StringNullableWithAggregatesFilter<"Audiencia"> | string | null
    status?: EnumStatusAudienciaWithAggregatesFilter<"Audiencia"> | $Enums.StatusAudiencia
    prepostoId?: StringWithAggregatesFilter<"Audiencia"> | string
    parceiroId?: StringWithAggregatesFilter<"Audiencia"> | string
    importacaoId?: StringNullableWithAggregatesFilter<"Audiencia"> | string | null
    observacoes?: StringNullableWithAggregatesFilter<"Audiencia"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Audiencia"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Audiencia"> | Date | string
  }

  export type MensagemWhereInput = {
    AND?: MensagemWhereInput | MensagemWhereInput[]
    OR?: MensagemWhereInput[]
    NOT?: MensagemWhereInput | MensagemWhereInput[]
    id?: StringFilter<"Mensagem"> | string
    audienciaId?: StringFilter<"Mensagem"> | string
    prepostoId?: StringNullableFilter<"Mensagem"> | string | null
    contatoParceiroId?: StringNullableFilter<"Mensagem"> | string | null
    tipo?: EnumTipoMensagemFilter<"Mensagem"> | $Enums.TipoMensagem
    direcao?: EnumDirecaoMensagemFilter<"Mensagem"> | $Enums.DirecaoMensagem
    conteudo?: StringFilter<"Mensagem"> | string
    respostaBotao?: StringNullableFilter<"Mensagem"> | string | null
    observacao?: StringNullableFilter<"Mensagem"> | string | null
    whatsappMessageId?: StringNullableFilter<"Mensagem"> | string | null
    statusEnvio?: EnumStatusEnvioMensagemFilter<"Mensagem"> | $Enums.StatusEnvioMensagem
    createdAt?: DateTimeFilter<"Mensagem"> | Date | string
    audiencia?: XOR<AudienciaScalarRelationFilter, AudienciaWhereInput>
    preposto?: XOR<PrepostoNullableScalarRelationFilter, PrepostoWhereInput> | null
    contatoParceiro?: XOR<ContatoParceiroNullableScalarRelationFilter, ContatoParceiroWhereInput> | null
  }

  export type MensagemOrderByWithRelationInput = {
    id?: SortOrder
    audienciaId?: SortOrder
    prepostoId?: SortOrderInput | SortOrder
    contatoParceiroId?: SortOrderInput | SortOrder
    tipo?: SortOrder
    direcao?: SortOrder
    conteudo?: SortOrder
    respostaBotao?: SortOrderInput | SortOrder
    observacao?: SortOrderInput | SortOrder
    whatsappMessageId?: SortOrderInput | SortOrder
    statusEnvio?: SortOrder
    createdAt?: SortOrder
    audiencia?: AudienciaOrderByWithRelationInput
    preposto?: PrepostoOrderByWithRelationInput
    contatoParceiro?: ContatoParceiroOrderByWithRelationInput
  }

  export type MensagemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MensagemWhereInput | MensagemWhereInput[]
    OR?: MensagemWhereInput[]
    NOT?: MensagemWhereInput | MensagemWhereInput[]
    audienciaId?: StringFilter<"Mensagem"> | string
    prepostoId?: StringNullableFilter<"Mensagem"> | string | null
    contatoParceiroId?: StringNullableFilter<"Mensagem"> | string | null
    tipo?: EnumTipoMensagemFilter<"Mensagem"> | $Enums.TipoMensagem
    direcao?: EnumDirecaoMensagemFilter<"Mensagem"> | $Enums.DirecaoMensagem
    conteudo?: StringFilter<"Mensagem"> | string
    respostaBotao?: StringNullableFilter<"Mensagem"> | string | null
    observacao?: StringNullableFilter<"Mensagem"> | string | null
    whatsappMessageId?: StringNullableFilter<"Mensagem"> | string | null
    statusEnvio?: EnumStatusEnvioMensagemFilter<"Mensagem"> | $Enums.StatusEnvioMensagem
    createdAt?: DateTimeFilter<"Mensagem"> | Date | string
    audiencia?: XOR<AudienciaScalarRelationFilter, AudienciaWhereInput>
    preposto?: XOR<PrepostoNullableScalarRelationFilter, PrepostoWhereInput> | null
    contatoParceiro?: XOR<ContatoParceiroNullableScalarRelationFilter, ContatoParceiroWhereInput> | null
  }, "id">

  export type MensagemOrderByWithAggregationInput = {
    id?: SortOrder
    audienciaId?: SortOrder
    prepostoId?: SortOrderInput | SortOrder
    contatoParceiroId?: SortOrderInput | SortOrder
    tipo?: SortOrder
    direcao?: SortOrder
    conteudo?: SortOrder
    respostaBotao?: SortOrderInput | SortOrder
    observacao?: SortOrderInput | SortOrder
    whatsappMessageId?: SortOrderInput | SortOrder
    statusEnvio?: SortOrder
    createdAt?: SortOrder
    _count?: MensagemCountOrderByAggregateInput
    _max?: MensagemMaxOrderByAggregateInput
    _min?: MensagemMinOrderByAggregateInput
  }

  export type MensagemScalarWhereWithAggregatesInput = {
    AND?: MensagemScalarWhereWithAggregatesInput | MensagemScalarWhereWithAggregatesInput[]
    OR?: MensagemScalarWhereWithAggregatesInput[]
    NOT?: MensagemScalarWhereWithAggregatesInput | MensagemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Mensagem"> | string
    audienciaId?: StringWithAggregatesFilter<"Mensagem"> | string
    prepostoId?: StringNullableWithAggregatesFilter<"Mensagem"> | string | null
    contatoParceiroId?: StringNullableWithAggregatesFilter<"Mensagem"> | string | null
    tipo?: EnumTipoMensagemWithAggregatesFilter<"Mensagem"> | $Enums.TipoMensagem
    direcao?: EnumDirecaoMensagemWithAggregatesFilter<"Mensagem"> | $Enums.DirecaoMensagem
    conteudo?: StringWithAggregatesFilter<"Mensagem"> | string
    respostaBotao?: StringNullableWithAggregatesFilter<"Mensagem"> | string | null
    observacao?: StringNullableWithAggregatesFilter<"Mensagem"> | string | null
    whatsappMessageId?: StringNullableWithAggregatesFilter<"Mensagem"> | string | null
    statusEnvio?: EnumStatusEnvioMensagemWithAggregatesFilter<"Mensagem"> | $Enums.StatusEnvioMensagem
    createdAt?: DateTimeWithAggregatesFilter<"Mensagem"> | Date | string
  }

  export type RelatorioAudienciaWhereInput = {
    AND?: RelatorioAudienciaWhereInput | RelatorioAudienciaWhereInput[]
    OR?: RelatorioAudienciaWhereInput[]
    NOT?: RelatorioAudienciaWhereInput | RelatorioAudienciaWhereInput[]
    id?: StringFilter<"RelatorioAudiencia"> | string
    audienciaId?: StringFilter<"RelatorioAudiencia"> | string
    audienciaOcorreu?: EnumOcorrenciaAudienciaNullableFilter<"RelatorioAudiencia"> | $Enums.OcorrenciaAudiencia | null
    resultado?: EnumResultadoAudienciaNullableFilter<"RelatorioAudiencia"> | $Enums.ResultadoAudiencia | null
    advogadoPresente?: BoolNullableFilter<"RelatorioAudiencia"> | boolean | null
    advogadoDominioCaso?: BoolNullableFilter<"RelatorioAudiencia"> | boolean | null
    problemaRelevante?: BoolNullableFilter<"RelatorioAudiencia"> | boolean | null
    relato?: StringNullableFilter<"RelatorioAudiencia"> | string | null
    createdAt?: DateTimeFilter<"RelatorioAudiencia"> | Date | string
    audiencia?: XOR<AudienciaScalarRelationFilter, AudienciaWhereInput>
  }

  export type RelatorioAudienciaOrderByWithRelationInput = {
    id?: SortOrder
    audienciaId?: SortOrder
    audienciaOcorreu?: SortOrderInput | SortOrder
    resultado?: SortOrderInput | SortOrder
    advogadoPresente?: SortOrderInput | SortOrder
    advogadoDominioCaso?: SortOrderInput | SortOrder
    problemaRelevante?: SortOrderInput | SortOrder
    relato?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    audiencia?: AudienciaOrderByWithRelationInput
  }

  export type RelatorioAudienciaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    audienciaId?: string
    AND?: RelatorioAudienciaWhereInput | RelatorioAudienciaWhereInput[]
    OR?: RelatorioAudienciaWhereInput[]
    NOT?: RelatorioAudienciaWhereInput | RelatorioAudienciaWhereInput[]
    audienciaOcorreu?: EnumOcorrenciaAudienciaNullableFilter<"RelatorioAudiencia"> | $Enums.OcorrenciaAudiencia | null
    resultado?: EnumResultadoAudienciaNullableFilter<"RelatorioAudiencia"> | $Enums.ResultadoAudiencia | null
    advogadoPresente?: BoolNullableFilter<"RelatorioAudiencia"> | boolean | null
    advogadoDominioCaso?: BoolNullableFilter<"RelatorioAudiencia"> | boolean | null
    problemaRelevante?: BoolNullableFilter<"RelatorioAudiencia"> | boolean | null
    relato?: StringNullableFilter<"RelatorioAudiencia"> | string | null
    createdAt?: DateTimeFilter<"RelatorioAudiencia"> | Date | string
    audiencia?: XOR<AudienciaScalarRelationFilter, AudienciaWhereInput>
  }, "id" | "audienciaId">

  export type RelatorioAudienciaOrderByWithAggregationInput = {
    id?: SortOrder
    audienciaId?: SortOrder
    audienciaOcorreu?: SortOrderInput | SortOrder
    resultado?: SortOrderInput | SortOrder
    advogadoPresente?: SortOrderInput | SortOrder
    advogadoDominioCaso?: SortOrderInput | SortOrder
    problemaRelevante?: SortOrderInput | SortOrder
    relato?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RelatorioAudienciaCountOrderByAggregateInput
    _max?: RelatorioAudienciaMaxOrderByAggregateInput
    _min?: RelatorioAudienciaMinOrderByAggregateInput
  }

  export type RelatorioAudienciaScalarWhereWithAggregatesInput = {
    AND?: RelatorioAudienciaScalarWhereWithAggregatesInput | RelatorioAudienciaScalarWhereWithAggregatesInput[]
    OR?: RelatorioAudienciaScalarWhereWithAggregatesInput[]
    NOT?: RelatorioAudienciaScalarWhereWithAggregatesInput | RelatorioAudienciaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RelatorioAudiencia"> | string
    audienciaId?: StringWithAggregatesFilter<"RelatorioAudiencia"> | string
    audienciaOcorreu?: EnumOcorrenciaAudienciaNullableWithAggregatesFilter<"RelatorioAudiencia"> | $Enums.OcorrenciaAudiencia | null
    resultado?: EnumResultadoAudienciaNullableWithAggregatesFilter<"RelatorioAudiencia"> | $Enums.ResultadoAudiencia | null
    advogadoPresente?: BoolNullableWithAggregatesFilter<"RelatorioAudiencia"> | boolean | null
    advogadoDominioCaso?: BoolNullableWithAggregatesFilter<"RelatorioAudiencia"> | boolean | null
    problemaRelevante?: BoolNullableWithAggregatesFilter<"RelatorioAudiencia"> | boolean | null
    relato?: StringNullableWithAggregatesFilter<"RelatorioAudiencia"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RelatorioAudiencia"> | Date | string
  }

  export type HistoricoStatusWhereInput = {
    AND?: HistoricoStatusWhereInput | HistoricoStatusWhereInput[]
    OR?: HistoricoStatusWhereInput[]
    NOT?: HistoricoStatusWhereInput | HistoricoStatusWhereInput[]
    id?: StringFilter<"HistoricoStatus"> | string
    audienciaId?: StringFilter<"HistoricoStatus"> | string
    statusAnterior?: EnumStatusAudienciaFilter<"HistoricoStatus"> | $Enums.StatusAudiencia
    statusNovo?: EnumStatusAudienciaFilter<"HistoricoStatus"> | $Enums.StatusAudiencia
    motivo?: StringNullableFilter<"HistoricoStatus"> | string | null
    atualizadoPor?: StringFilter<"HistoricoStatus"> | string
    createdAt?: DateTimeFilter<"HistoricoStatus"> | Date | string
    audiencia?: XOR<AudienciaScalarRelationFilter, AudienciaWhereInput>
  }

  export type HistoricoStatusOrderByWithRelationInput = {
    id?: SortOrder
    audienciaId?: SortOrder
    statusAnterior?: SortOrder
    statusNovo?: SortOrder
    motivo?: SortOrderInput | SortOrder
    atualizadoPor?: SortOrder
    createdAt?: SortOrder
    audiencia?: AudienciaOrderByWithRelationInput
  }

  export type HistoricoStatusWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HistoricoStatusWhereInput | HistoricoStatusWhereInput[]
    OR?: HistoricoStatusWhereInput[]
    NOT?: HistoricoStatusWhereInput | HistoricoStatusWhereInput[]
    audienciaId?: StringFilter<"HistoricoStatus"> | string
    statusAnterior?: EnumStatusAudienciaFilter<"HistoricoStatus"> | $Enums.StatusAudiencia
    statusNovo?: EnumStatusAudienciaFilter<"HistoricoStatus"> | $Enums.StatusAudiencia
    motivo?: StringNullableFilter<"HistoricoStatus"> | string | null
    atualizadoPor?: StringFilter<"HistoricoStatus"> | string
    createdAt?: DateTimeFilter<"HistoricoStatus"> | Date | string
    audiencia?: XOR<AudienciaScalarRelationFilter, AudienciaWhereInput>
  }, "id">

  export type HistoricoStatusOrderByWithAggregationInput = {
    id?: SortOrder
    audienciaId?: SortOrder
    statusAnterior?: SortOrder
    statusNovo?: SortOrder
    motivo?: SortOrderInput | SortOrder
    atualizadoPor?: SortOrder
    createdAt?: SortOrder
    _count?: HistoricoStatusCountOrderByAggregateInput
    _max?: HistoricoStatusMaxOrderByAggregateInput
    _min?: HistoricoStatusMinOrderByAggregateInput
  }

  export type HistoricoStatusScalarWhereWithAggregatesInput = {
    AND?: HistoricoStatusScalarWhereWithAggregatesInput | HistoricoStatusScalarWhereWithAggregatesInput[]
    OR?: HistoricoStatusScalarWhereWithAggregatesInput[]
    NOT?: HistoricoStatusScalarWhereWithAggregatesInput | HistoricoStatusScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HistoricoStatus"> | string
    audienciaId?: StringWithAggregatesFilter<"HistoricoStatus"> | string
    statusAnterior?: EnumStatusAudienciaWithAggregatesFilter<"HistoricoStatus"> | $Enums.StatusAudiencia
    statusNovo?: EnumStatusAudienciaWithAggregatesFilter<"HistoricoStatus"> | $Enums.StatusAudiencia
    motivo?: StringNullableWithAggregatesFilter<"HistoricoStatus"> | string | null
    atualizadoPor?: StringWithAggregatesFilter<"HistoricoStatus"> | string
    createdAt?: DateTimeWithAggregatesFilter<"HistoricoStatus"> | Date | string
  }

  export type SubstituicaoWhereInput = {
    AND?: SubstituicaoWhereInput | SubstituicaoWhereInput[]
    OR?: SubstituicaoWhereInput[]
    NOT?: SubstituicaoWhereInput | SubstituicaoWhereInput[]
    id?: StringFilter<"Substituicao"> | string
    audienciaId?: StringFilter<"Substituicao"> | string
    prepostoAnteriorId?: StringFilter<"Substituicao"> | string
    prepostoNovoId?: StringNullableFilter<"Substituicao"> | string | null
    motivo?: StringFilter<"Substituicao"> | string
    status?: EnumStatusSubstituicaoFilter<"Substituicao"> | $Enums.StatusSubstituicao
    createdAt?: DateTimeFilter<"Substituicao"> | Date | string
    resolvidoEm?: DateTimeNullableFilter<"Substituicao"> | Date | string | null
    audiencia?: XOR<AudienciaScalarRelationFilter, AudienciaWhereInput>
    prepostoAnterior?: XOR<PrepostoScalarRelationFilter, PrepostoWhereInput>
    prepostoNovo?: XOR<PrepostoNullableScalarRelationFilter, PrepostoWhereInput> | null
  }

  export type SubstituicaoOrderByWithRelationInput = {
    id?: SortOrder
    audienciaId?: SortOrder
    prepostoAnteriorId?: SortOrder
    prepostoNovoId?: SortOrderInput | SortOrder
    motivo?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    resolvidoEm?: SortOrderInput | SortOrder
    audiencia?: AudienciaOrderByWithRelationInput
    prepostoAnterior?: PrepostoOrderByWithRelationInput
    prepostoNovo?: PrepostoOrderByWithRelationInput
  }

  export type SubstituicaoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubstituicaoWhereInput | SubstituicaoWhereInput[]
    OR?: SubstituicaoWhereInput[]
    NOT?: SubstituicaoWhereInput | SubstituicaoWhereInput[]
    audienciaId?: StringFilter<"Substituicao"> | string
    prepostoAnteriorId?: StringFilter<"Substituicao"> | string
    prepostoNovoId?: StringNullableFilter<"Substituicao"> | string | null
    motivo?: StringFilter<"Substituicao"> | string
    status?: EnumStatusSubstituicaoFilter<"Substituicao"> | $Enums.StatusSubstituicao
    createdAt?: DateTimeFilter<"Substituicao"> | Date | string
    resolvidoEm?: DateTimeNullableFilter<"Substituicao"> | Date | string | null
    audiencia?: XOR<AudienciaScalarRelationFilter, AudienciaWhereInput>
    prepostoAnterior?: XOR<PrepostoScalarRelationFilter, PrepostoWhereInput>
    prepostoNovo?: XOR<PrepostoNullableScalarRelationFilter, PrepostoWhereInput> | null
  }, "id">

  export type SubstituicaoOrderByWithAggregationInput = {
    id?: SortOrder
    audienciaId?: SortOrder
    prepostoAnteriorId?: SortOrder
    prepostoNovoId?: SortOrderInput | SortOrder
    motivo?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    resolvidoEm?: SortOrderInput | SortOrder
    _count?: SubstituicaoCountOrderByAggregateInput
    _max?: SubstituicaoMaxOrderByAggregateInput
    _min?: SubstituicaoMinOrderByAggregateInput
  }

  export type SubstituicaoScalarWhereWithAggregatesInput = {
    AND?: SubstituicaoScalarWhereWithAggregatesInput | SubstituicaoScalarWhereWithAggregatesInput[]
    OR?: SubstituicaoScalarWhereWithAggregatesInput[]
    NOT?: SubstituicaoScalarWhereWithAggregatesInput | SubstituicaoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Substituicao"> | string
    audienciaId?: StringWithAggregatesFilter<"Substituicao"> | string
    prepostoAnteriorId?: StringWithAggregatesFilter<"Substituicao"> | string
    prepostoNovoId?: StringNullableWithAggregatesFilter<"Substituicao"> | string | null
    motivo?: StringWithAggregatesFilter<"Substituicao"> | string
    status?: EnumStatusSubstituicaoWithAggregatesFilter<"Substituicao"> | $Enums.StatusSubstituicao
    createdAt?: DateTimeWithAggregatesFilter<"Substituicao"> | Date | string
    resolvidoEm?: DateTimeNullableWithAggregatesFilter<"Substituicao"> | Date | string | null
  }

  export type UsuarioCreateInput = {
    id?: string
    nome: string
    email: string
    senha: string
    role?: $Enums.RoleUsuario
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsuarioUncheckedCreateInput = {
    id?: string
    nome: string
    email: string
    senha: string
    role?: $Enums.RoleUsuario
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsuarioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleUsuarioFieldUpdateOperationsInput | $Enums.RoleUsuario
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleUsuarioFieldUpdateOperationsInput | $Enums.RoleUsuario
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioCreateManyInput = {
    id?: string
    nome: string
    email: string
    senha: string
    role?: $Enums.RoleUsuario
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsuarioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleUsuarioFieldUpdateOperationsInput | $Enums.RoleUsuario
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleUsuarioFieldUpdateOperationsInput | $Enums.RoleUsuario
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrtCreateInput = {
    id?: string
    numero: string
    nome: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    audiencias?: AudienciaCreateNestedManyWithoutTrtInput
  }

  export type TrtUncheckedCreateInput = {
    id?: string
    numero: string
    nome: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    audiencias?: AudienciaUncheckedCreateNestedManyWithoutTrtInput
  }

  export type TrtUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    audiencias?: AudienciaUpdateManyWithoutTrtNestedInput
  }

  export type TrtUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    audiencias?: AudienciaUncheckedUpdateManyWithoutTrtNestedInput
  }

  export type TrtCreateManyInput = {
    id?: string
    numero: string
    nome: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrtUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrtUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrepostoCreateInput = {
    id?: string
    nome: string
    telefoneWhatsapp: string
    email?: string | null
    cpf?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    audiencias?: AudienciaCreateNestedManyWithoutPrepostoInput
    mensagens?: MensagemCreateNestedManyWithoutPrepostoInput
    substituicoesAnterior?: SubstituicaoCreateNestedManyWithoutPrepostoAnteriorInput
    substituicoesNovo?: SubstituicaoCreateNestedManyWithoutPrepostoNovoInput
  }

  export type PrepostoUncheckedCreateInput = {
    id?: string
    nome: string
    telefoneWhatsapp: string
    email?: string | null
    cpf?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    audiencias?: AudienciaUncheckedCreateNestedManyWithoutPrepostoInput
    mensagens?: MensagemUncheckedCreateNestedManyWithoutPrepostoInput
    substituicoesAnterior?: SubstituicaoUncheckedCreateNestedManyWithoutPrepostoAnteriorInput
    substituicoesNovo?: SubstituicaoUncheckedCreateNestedManyWithoutPrepostoNovoInput
  }

  export type PrepostoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    audiencias?: AudienciaUpdateManyWithoutPrepostoNestedInput
    mensagens?: MensagemUpdateManyWithoutPrepostoNestedInput
    substituicoesAnterior?: SubstituicaoUpdateManyWithoutPrepostoAnteriorNestedInput
    substituicoesNovo?: SubstituicaoUpdateManyWithoutPrepostoNovoNestedInput
  }

  export type PrepostoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    audiencias?: AudienciaUncheckedUpdateManyWithoutPrepostoNestedInput
    mensagens?: MensagemUncheckedUpdateManyWithoutPrepostoNestedInput
    substituicoesAnterior?: SubstituicaoUncheckedUpdateManyWithoutPrepostoAnteriorNestedInput
    substituicoesNovo?: SubstituicaoUncheckedUpdateManyWithoutPrepostoNovoNestedInput
  }

  export type PrepostoCreateManyInput = {
    id?: string
    nome: string
    telefoneWhatsapp: string
    email?: string | null
    cpf?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrepostoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrepostoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParceiroCreateInput = {
    id?: string
    nome: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contatos?: ContatoParceiroCreateNestedManyWithoutParceiroInput
    audiencias?: AudienciaCreateNestedManyWithoutParceiroInput
  }

  export type ParceiroUncheckedCreateInput = {
    id?: string
    nome: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contatos?: ContatoParceiroUncheckedCreateNestedManyWithoutParceiroInput
    audiencias?: AudienciaUncheckedCreateNestedManyWithoutParceiroInput
  }

  export type ParceiroUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contatos?: ContatoParceiroUpdateManyWithoutParceiroNestedInput
    audiencias?: AudienciaUpdateManyWithoutParceiroNestedInput
  }

  export type ParceiroUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contatos?: ContatoParceiroUncheckedUpdateManyWithoutParceiroNestedInput
    audiencias?: AudienciaUncheckedUpdateManyWithoutParceiroNestedInput
  }

  export type ParceiroCreateManyInput = {
    id?: string
    nome: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParceiroUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParceiroUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContatoParceiroCreateInput = {
    id?: string
    nome: string
    telefoneWhatsapp: string
    email?: string | null
    cargo?: string | null
    ordemEscalonamento?: number
    createdAt?: Date | string
    parceiro: ParceiroCreateNestedOneWithoutContatosInput
    mensagens?: MensagemCreateNestedManyWithoutContatoParceiroInput
  }

  export type ContatoParceiroUncheckedCreateInput = {
    id?: string
    parceiroId: string
    nome: string
    telefoneWhatsapp: string
    email?: string | null
    cargo?: string | null
    ordemEscalonamento?: number
    createdAt?: Date | string
    mensagens?: MensagemUncheckedCreateNestedManyWithoutContatoParceiroInput
  }

  export type ContatoParceiroUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    ordemEscalonamento?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parceiro?: ParceiroUpdateOneRequiredWithoutContatosNestedInput
    mensagens?: MensagemUpdateManyWithoutContatoParceiroNestedInput
  }

  export type ContatoParceiroUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    parceiroId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    ordemEscalonamento?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mensagens?: MensagemUncheckedUpdateManyWithoutContatoParceiroNestedInput
  }

  export type ContatoParceiroCreateManyInput = {
    id?: string
    parceiroId: string
    nome: string
    telefoneWhatsapp: string
    email?: string | null
    cargo?: string | null
    ordemEscalonamento?: number
    createdAt?: Date | string
  }

  export type ContatoParceiroUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    ordemEscalonamento?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContatoParceiroUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    parceiroId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    ordemEscalonamento?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImportacaoCreateInput = {
    id?: string
    nomeArquivo: string
    totalRegistros?: number
    registrosImportados?: number
    registrosIgnorados?: number
    mapeamentoColunas?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.StatusImportacao
    erros?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    audiencias?: AudienciaCreateNestedManyWithoutImportacaoInput
  }

  export type ImportacaoUncheckedCreateInput = {
    id?: string
    nomeArquivo: string
    totalRegistros?: number
    registrosImportados?: number
    registrosIgnorados?: number
    mapeamentoColunas?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.StatusImportacao
    erros?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    audiencias?: AudienciaUncheckedCreateNestedManyWithoutImportacaoInput
  }

  export type ImportacaoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeArquivo?: StringFieldUpdateOperationsInput | string
    totalRegistros?: IntFieldUpdateOperationsInput | number
    registrosImportados?: IntFieldUpdateOperationsInput | number
    registrosIgnorados?: IntFieldUpdateOperationsInput | number
    mapeamentoColunas?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumStatusImportacaoFieldUpdateOperationsInput | $Enums.StatusImportacao
    erros?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    audiencias?: AudienciaUpdateManyWithoutImportacaoNestedInput
  }

  export type ImportacaoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeArquivo?: StringFieldUpdateOperationsInput | string
    totalRegistros?: IntFieldUpdateOperationsInput | number
    registrosImportados?: IntFieldUpdateOperationsInput | number
    registrosIgnorados?: IntFieldUpdateOperationsInput | number
    mapeamentoColunas?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumStatusImportacaoFieldUpdateOperationsInput | $Enums.StatusImportacao
    erros?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    audiencias?: AudienciaUncheckedUpdateManyWithoutImportacaoNestedInput
  }

  export type ImportacaoCreateManyInput = {
    id?: string
    nomeArquivo: string
    totalRegistros?: number
    registrosImportados?: number
    registrosIgnorados?: number
    mapeamentoColunas?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.StatusImportacao
    erros?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ImportacaoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeArquivo?: StringFieldUpdateOperationsInput | string
    totalRegistros?: IntFieldUpdateOperationsInput | number
    registrosImportados?: IntFieldUpdateOperationsInput | number
    registrosIgnorados?: IntFieldUpdateOperationsInput | number
    mapeamentoColunas?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumStatusImportacaoFieldUpdateOperationsInput | $Enums.StatusImportacao
    erros?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImportacaoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeArquivo?: StringFieldUpdateOperationsInput | string
    totalRegistros?: IntFieldUpdateOperationsInput | number
    registrosImportados?: IntFieldUpdateOperationsInput | number
    registrosIgnorados?: IntFieldUpdateOperationsInput | number
    mapeamentoColunas?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumStatusImportacaoFieldUpdateOperationsInput | $Enums.StatusImportacao
    erros?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AudienciaCreateInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    vara?: string | null
    status?: $Enums.StatusAudiencia
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trt: TrtCreateNestedOneWithoutAudienciasInput
    preposto: PrepostoCreateNestedOneWithoutAudienciasInput
    parceiro: ParceiroCreateNestedOneWithoutAudienciasInput
    importacao?: ImportacaoCreateNestedOneWithoutAudienciasInput
    mensagens?: MensagemCreateNestedManyWithoutAudienciaInput
    historicoStatus?: HistoricoStatusCreateNestedManyWithoutAudienciaInput
    relatorio?: RelatorioAudienciaCreateNestedOneWithoutAudienciaInput
    substituicoes?: SubstituicaoCreateNestedManyWithoutAudienciaInput
  }

  export type AudienciaUncheckedCreateInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    trtId: string
    vara?: string | null
    status?: $Enums.StatusAudiencia
    prepostoId: string
    parceiroId: string
    importacaoId?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mensagens?: MensagemUncheckedCreateNestedManyWithoutAudienciaInput
    historicoStatus?: HistoricoStatusUncheckedCreateNestedManyWithoutAudienciaInput
    relatorio?: RelatorioAudienciaUncheckedCreateNestedOneWithoutAudienciaInput
    substituicoes?: SubstituicaoUncheckedCreateNestedManyWithoutAudienciaInput
  }

  export type AudienciaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trt?: TrtUpdateOneRequiredWithoutAudienciasNestedInput
    preposto?: PrepostoUpdateOneRequiredWithoutAudienciasNestedInput
    parceiro?: ParceiroUpdateOneRequiredWithoutAudienciasNestedInput
    importacao?: ImportacaoUpdateOneWithoutAudienciasNestedInput
    mensagens?: MensagemUpdateManyWithoutAudienciaNestedInput
    historicoStatus?: HistoricoStatusUpdateManyWithoutAudienciaNestedInput
    relatorio?: RelatorioAudienciaUpdateOneWithoutAudienciaNestedInput
    substituicoes?: SubstituicaoUpdateManyWithoutAudienciaNestedInput
  }

  export type AudienciaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    trtId?: StringFieldUpdateOperationsInput | string
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    prepostoId?: StringFieldUpdateOperationsInput | string
    parceiroId?: StringFieldUpdateOperationsInput | string
    importacaoId?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mensagens?: MensagemUncheckedUpdateManyWithoutAudienciaNestedInput
    historicoStatus?: HistoricoStatusUncheckedUpdateManyWithoutAudienciaNestedInput
    relatorio?: RelatorioAudienciaUncheckedUpdateOneWithoutAudienciaNestedInput
    substituicoes?: SubstituicaoUncheckedUpdateManyWithoutAudienciaNestedInput
  }

  export type AudienciaCreateManyInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    trtId: string
    vara?: string | null
    status?: $Enums.StatusAudiencia
    prepostoId: string
    parceiroId: string
    importacaoId?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AudienciaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AudienciaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    trtId?: StringFieldUpdateOperationsInput | string
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    prepostoId?: StringFieldUpdateOperationsInput | string
    parceiroId?: StringFieldUpdateOperationsInput | string
    importacaoId?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MensagemCreateInput = {
    id?: string
    tipo: $Enums.TipoMensagem
    direcao: $Enums.DirecaoMensagem
    conteudo: string
    respostaBotao?: string | null
    observacao?: string | null
    whatsappMessageId?: string | null
    statusEnvio?: $Enums.StatusEnvioMensagem
    createdAt?: Date | string
    audiencia: AudienciaCreateNestedOneWithoutMensagensInput
    preposto?: PrepostoCreateNestedOneWithoutMensagensInput
    contatoParceiro?: ContatoParceiroCreateNestedOneWithoutMensagensInput
  }

  export type MensagemUncheckedCreateInput = {
    id?: string
    audienciaId: string
    prepostoId?: string | null
    contatoParceiroId?: string | null
    tipo: $Enums.TipoMensagem
    direcao: $Enums.DirecaoMensagem
    conteudo: string
    respostaBotao?: string | null
    observacao?: string | null
    whatsappMessageId?: string | null
    statusEnvio?: $Enums.StatusEnvioMensagem
    createdAt?: Date | string
  }

  export type MensagemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoMensagemFieldUpdateOperationsInput | $Enums.TipoMensagem
    direcao?: EnumDirecaoMensagemFieldUpdateOperationsInput | $Enums.DirecaoMensagem
    conteudo?: StringFieldUpdateOperationsInput | string
    respostaBotao?: NullableStringFieldUpdateOperationsInput | string | null
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    statusEnvio?: EnumStatusEnvioMensagemFieldUpdateOperationsInput | $Enums.StatusEnvioMensagem
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    audiencia?: AudienciaUpdateOneRequiredWithoutMensagensNestedInput
    preposto?: PrepostoUpdateOneWithoutMensagensNestedInput
    contatoParceiro?: ContatoParceiroUpdateOneWithoutMensagensNestedInput
  }

  export type MensagemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    audienciaId?: StringFieldUpdateOperationsInput | string
    prepostoId?: NullableStringFieldUpdateOperationsInput | string | null
    contatoParceiroId?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoMensagemFieldUpdateOperationsInput | $Enums.TipoMensagem
    direcao?: EnumDirecaoMensagemFieldUpdateOperationsInput | $Enums.DirecaoMensagem
    conteudo?: StringFieldUpdateOperationsInput | string
    respostaBotao?: NullableStringFieldUpdateOperationsInput | string | null
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    statusEnvio?: EnumStatusEnvioMensagemFieldUpdateOperationsInput | $Enums.StatusEnvioMensagem
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MensagemCreateManyInput = {
    id?: string
    audienciaId: string
    prepostoId?: string | null
    contatoParceiroId?: string | null
    tipo: $Enums.TipoMensagem
    direcao: $Enums.DirecaoMensagem
    conteudo: string
    respostaBotao?: string | null
    observacao?: string | null
    whatsappMessageId?: string | null
    statusEnvio?: $Enums.StatusEnvioMensagem
    createdAt?: Date | string
  }

  export type MensagemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoMensagemFieldUpdateOperationsInput | $Enums.TipoMensagem
    direcao?: EnumDirecaoMensagemFieldUpdateOperationsInput | $Enums.DirecaoMensagem
    conteudo?: StringFieldUpdateOperationsInput | string
    respostaBotao?: NullableStringFieldUpdateOperationsInput | string | null
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    statusEnvio?: EnumStatusEnvioMensagemFieldUpdateOperationsInput | $Enums.StatusEnvioMensagem
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MensagemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    audienciaId?: StringFieldUpdateOperationsInput | string
    prepostoId?: NullableStringFieldUpdateOperationsInput | string | null
    contatoParceiroId?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoMensagemFieldUpdateOperationsInput | $Enums.TipoMensagem
    direcao?: EnumDirecaoMensagemFieldUpdateOperationsInput | $Enums.DirecaoMensagem
    conteudo?: StringFieldUpdateOperationsInput | string
    respostaBotao?: NullableStringFieldUpdateOperationsInput | string | null
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    statusEnvio?: EnumStatusEnvioMensagemFieldUpdateOperationsInput | $Enums.StatusEnvioMensagem
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RelatorioAudienciaCreateInput = {
    id?: string
    audienciaOcorreu?: $Enums.OcorrenciaAudiencia | null
    resultado?: $Enums.ResultadoAudiencia | null
    advogadoPresente?: boolean | null
    advogadoDominioCaso?: boolean | null
    problemaRelevante?: boolean | null
    relato?: string | null
    createdAt?: Date | string
    audiencia: AudienciaCreateNestedOneWithoutRelatorioInput
  }

  export type RelatorioAudienciaUncheckedCreateInput = {
    id?: string
    audienciaId: string
    audienciaOcorreu?: $Enums.OcorrenciaAudiencia | null
    resultado?: $Enums.ResultadoAudiencia | null
    advogadoPresente?: boolean | null
    advogadoDominioCaso?: boolean | null
    problemaRelevante?: boolean | null
    relato?: string | null
    createdAt?: Date | string
  }

  export type RelatorioAudienciaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    audienciaOcorreu?: NullableEnumOcorrenciaAudienciaFieldUpdateOperationsInput | $Enums.OcorrenciaAudiencia | null
    resultado?: NullableEnumResultadoAudienciaFieldUpdateOperationsInput | $Enums.ResultadoAudiencia | null
    advogadoPresente?: NullableBoolFieldUpdateOperationsInput | boolean | null
    advogadoDominioCaso?: NullableBoolFieldUpdateOperationsInput | boolean | null
    problemaRelevante?: NullableBoolFieldUpdateOperationsInput | boolean | null
    relato?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    audiencia?: AudienciaUpdateOneRequiredWithoutRelatorioNestedInput
  }

  export type RelatorioAudienciaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    audienciaId?: StringFieldUpdateOperationsInput | string
    audienciaOcorreu?: NullableEnumOcorrenciaAudienciaFieldUpdateOperationsInput | $Enums.OcorrenciaAudiencia | null
    resultado?: NullableEnumResultadoAudienciaFieldUpdateOperationsInput | $Enums.ResultadoAudiencia | null
    advogadoPresente?: NullableBoolFieldUpdateOperationsInput | boolean | null
    advogadoDominioCaso?: NullableBoolFieldUpdateOperationsInput | boolean | null
    problemaRelevante?: NullableBoolFieldUpdateOperationsInput | boolean | null
    relato?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RelatorioAudienciaCreateManyInput = {
    id?: string
    audienciaId: string
    audienciaOcorreu?: $Enums.OcorrenciaAudiencia | null
    resultado?: $Enums.ResultadoAudiencia | null
    advogadoPresente?: boolean | null
    advogadoDominioCaso?: boolean | null
    problemaRelevante?: boolean | null
    relato?: string | null
    createdAt?: Date | string
  }

  export type RelatorioAudienciaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    audienciaOcorreu?: NullableEnumOcorrenciaAudienciaFieldUpdateOperationsInput | $Enums.OcorrenciaAudiencia | null
    resultado?: NullableEnumResultadoAudienciaFieldUpdateOperationsInput | $Enums.ResultadoAudiencia | null
    advogadoPresente?: NullableBoolFieldUpdateOperationsInput | boolean | null
    advogadoDominioCaso?: NullableBoolFieldUpdateOperationsInput | boolean | null
    problemaRelevante?: NullableBoolFieldUpdateOperationsInput | boolean | null
    relato?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RelatorioAudienciaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    audienciaId?: StringFieldUpdateOperationsInput | string
    audienciaOcorreu?: NullableEnumOcorrenciaAudienciaFieldUpdateOperationsInput | $Enums.OcorrenciaAudiencia | null
    resultado?: NullableEnumResultadoAudienciaFieldUpdateOperationsInput | $Enums.ResultadoAudiencia | null
    advogadoPresente?: NullableBoolFieldUpdateOperationsInput | boolean | null
    advogadoDominioCaso?: NullableBoolFieldUpdateOperationsInput | boolean | null
    problemaRelevante?: NullableBoolFieldUpdateOperationsInput | boolean | null
    relato?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HistoricoStatusCreateInput = {
    id?: string
    statusAnterior: $Enums.StatusAudiencia
    statusNovo: $Enums.StatusAudiencia
    motivo?: string | null
    atualizadoPor: string
    createdAt?: Date | string
    audiencia: AudienciaCreateNestedOneWithoutHistoricoStatusInput
  }

  export type HistoricoStatusUncheckedCreateInput = {
    id?: string
    audienciaId: string
    statusAnterior: $Enums.StatusAudiencia
    statusNovo: $Enums.StatusAudiencia
    motivo?: string | null
    atualizadoPor: string
    createdAt?: Date | string
  }

  export type HistoricoStatusUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    statusAnterior?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    statusNovo?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    motivo?: NullableStringFieldUpdateOperationsInput | string | null
    atualizadoPor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    audiencia?: AudienciaUpdateOneRequiredWithoutHistoricoStatusNestedInput
  }

  export type HistoricoStatusUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    audienciaId?: StringFieldUpdateOperationsInput | string
    statusAnterior?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    statusNovo?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    motivo?: NullableStringFieldUpdateOperationsInput | string | null
    atualizadoPor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HistoricoStatusCreateManyInput = {
    id?: string
    audienciaId: string
    statusAnterior: $Enums.StatusAudiencia
    statusNovo: $Enums.StatusAudiencia
    motivo?: string | null
    atualizadoPor: string
    createdAt?: Date | string
  }

  export type HistoricoStatusUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    statusAnterior?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    statusNovo?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    motivo?: NullableStringFieldUpdateOperationsInput | string | null
    atualizadoPor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HistoricoStatusUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    audienciaId?: StringFieldUpdateOperationsInput | string
    statusAnterior?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    statusNovo?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    motivo?: NullableStringFieldUpdateOperationsInput | string | null
    atualizadoPor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubstituicaoCreateInput = {
    id?: string
    motivo: string
    status?: $Enums.StatusSubstituicao
    createdAt?: Date | string
    resolvidoEm?: Date | string | null
    audiencia: AudienciaCreateNestedOneWithoutSubstituicoesInput
    prepostoAnterior: PrepostoCreateNestedOneWithoutSubstituicoesAnteriorInput
    prepostoNovo?: PrepostoCreateNestedOneWithoutSubstituicoesNovoInput
  }

  export type SubstituicaoUncheckedCreateInput = {
    id?: string
    audienciaId: string
    prepostoAnteriorId: string
    prepostoNovoId?: string | null
    motivo: string
    status?: $Enums.StatusSubstituicao
    createdAt?: Date | string
    resolvidoEm?: Date | string | null
  }

  export type SubstituicaoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusSubstituicaoFieldUpdateOperationsInput | $Enums.StatusSubstituicao
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    audiencia?: AudienciaUpdateOneRequiredWithoutSubstituicoesNestedInput
    prepostoAnterior?: PrepostoUpdateOneRequiredWithoutSubstituicoesAnteriorNestedInput
    prepostoNovo?: PrepostoUpdateOneWithoutSubstituicoesNovoNestedInput
  }

  export type SubstituicaoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    audienciaId?: StringFieldUpdateOperationsInput | string
    prepostoAnteriorId?: StringFieldUpdateOperationsInput | string
    prepostoNovoId?: NullableStringFieldUpdateOperationsInput | string | null
    motivo?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusSubstituicaoFieldUpdateOperationsInput | $Enums.StatusSubstituicao
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SubstituicaoCreateManyInput = {
    id?: string
    audienciaId: string
    prepostoAnteriorId: string
    prepostoNovoId?: string | null
    motivo: string
    status?: $Enums.StatusSubstituicao
    createdAt?: Date | string
    resolvidoEm?: Date | string | null
  }

  export type SubstituicaoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusSubstituicaoFieldUpdateOperationsInput | $Enums.StatusSubstituicao
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SubstituicaoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    audienciaId?: StringFieldUpdateOperationsInput | string
    prepostoAnteriorId?: StringFieldUpdateOperationsInput | string
    prepostoNovoId?: NullableStringFieldUpdateOperationsInput | string | null
    motivo?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusSubstituicaoFieldUpdateOperationsInput | $Enums.StatusSubstituicao
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleUsuarioFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleUsuario | EnumRoleUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.RoleUsuario[] | ListEnumRoleUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoleUsuario[] | ListEnumRoleUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleUsuarioFilter<$PrismaModel> | $Enums.RoleUsuario
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleUsuarioWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleUsuario | EnumRoleUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.RoleUsuario[] | ListEnumRoleUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoleUsuario[] | ListEnumRoleUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleUsuarioWithAggregatesFilter<$PrismaModel> | $Enums.RoleUsuario
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleUsuarioFilter<$PrismaModel>
    _max?: NestedEnumRoleUsuarioFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AudienciaListRelationFilter = {
    every?: AudienciaWhereInput
    some?: AudienciaWhereInput
    none?: AudienciaWhereInput
  }

  export type AudienciaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrtCountOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    nome?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrtMaxOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    nome?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrtMinOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    nome?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type MensagemListRelationFilter = {
    every?: MensagemWhereInput
    some?: MensagemWhereInput
    none?: MensagemWhereInput
  }

  export type SubstituicaoListRelationFilter = {
    every?: SubstituicaoWhereInput
    some?: SubstituicaoWhereInput
    none?: SubstituicaoWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MensagemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubstituicaoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PrepostoCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    telefoneWhatsapp?: SortOrder
    email?: SortOrder
    cpf?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrepostoMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    telefoneWhatsapp?: SortOrder
    email?: SortOrder
    cpf?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrepostoMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    telefoneWhatsapp?: SortOrder
    email?: SortOrder
    cpf?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ContatoParceiroListRelationFilter = {
    every?: ContatoParceiroWhereInput
    some?: ContatoParceiroWhereInput
    none?: ContatoParceiroWhereInput
  }

  export type ContatoParceiroOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ParceiroCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParceiroMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParceiroMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ParceiroScalarRelationFilter = {
    is?: ParceiroWhereInput
    isNot?: ParceiroWhereInput
  }

  export type ContatoParceiroCountOrderByAggregateInput = {
    id?: SortOrder
    parceiroId?: SortOrder
    nome?: SortOrder
    telefoneWhatsapp?: SortOrder
    email?: SortOrder
    cargo?: SortOrder
    ordemEscalonamento?: SortOrder
    createdAt?: SortOrder
  }

  export type ContatoParceiroAvgOrderByAggregateInput = {
    ordemEscalonamento?: SortOrder
  }

  export type ContatoParceiroMaxOrderByAggregateInput = {
    id?: SortOrder
    parceiroId?: SortOrder
    nome?: SortOrder
    telefoneWhatsapp?: SortOrder
    email?: SortOrder
    cargo?: SortOrder
    ordemEscalonamento?: SortOrder
    createdAt?: SortOrder
  }

  export type ContatoParceiroMinOrderByAggregateInput = {
    id?: SortOrder
    parceiroId?: SortOrder
    nome?: SortOrder
    telefoneWhatsapp?: SortOrder
    email?: SortOrder
    cargo?: SortOrder
    ordemEscalonamento?: SortOrder
    createdAt?: SortOrder
  }

  export type ContatoParceiroSumOrderByAggregateInput = {
    ordemEscalonamento?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumStatusImportacaoFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusImportacao | EnumStatusImportacaoFieldRefInput<$PrismaModel>
    in?: $Enums.StatusImportacao[] | ListEnumStatusImportacaoFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusImportacao[] | ListEnumStatusImportacaoFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusImportacaoFilter<$PrismaModel> | $Enums.StatusImportacao
  }

  export type ImportacaoCountOrderByAggregateInput = {
    id?: SortOrder
    nomeArquivo?: SortOrder
    totalRegistros?: SortOrder
    registrosImportados?: SortOrder
    registrosIgnorados?: SortOrder
    mapeamentoColunas?: SortOrder
    status?: SortOrder
    erros?: SortOrder
    createdAt?: SortOrder
  }

  export type ImportacaoAvgOrderByAggregateInput = {
    totalRegistros?: SortOrder
    registrosImportados?: SortOrder
    registrosIgnorados?: SortOrder
  }

  export type ImportacaoMaxOrderByAggregateInput = {
    id?: SortOrder
    nomeArquivo?: SortOrder
    totalRegistros?: SortOrder
    registrosImportados?: SortOrder
    registrosIgnorados?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ImportacaoMinOrderByAggregateInput = {
    id?: SortOrder
    nomeArquivo?: SortOrder
    totalRegistros?: SortOrder
    registrosImportados?: SortOrder
    registrosIgnorados?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ImportacaoSumOrderByAggregateInput = {
    totalRegistros?: SortOrder
    registrosImportados?: SortOrder
    registrosIgnorados?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumStatusImportacaoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusImportacao | EnumStatusImportacaoFieldRefInput<$PrismaModel>
    in?: $Enums.StatusImportacao[] | ListEnumStatusImportacaoFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusImportacao[] | ListEnumStatusImportacaoFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusImportacaoWithAggregatesFilter<$PrismaModel> | $Enums.StatusImportacao
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusImportacaoFilter<$PrismaModel>
    _max?: NestedEnumStatusImportacaoFilter<$PrismaModel>
  }

  export type EnumModalidadeFilter<$PrismaModel = never> = {
    equals?: $Enums.Modalidade | EnumModalidadeFieldRefInput<$PrismaModel>
    in?: $Enums.Modalidade[] | ListEnumModalidadeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Modalidade[] | ListEnumModalidadeFieldRefInput<$PrismaModel>
    not?: NestedEnumModalidadeFilter<$PrismaModel> | $Enums.Modalidade
  }

  export type EnumStatusAudienciaFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusAudiencia | EnumStatusAudienciaFieldRefInput<$PrismaModel>
    in?: $Enums.StatusAudiencia[] | ListEnumStatusAudienciaFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusAudiencia[] | ListEnumStatusAudienciaFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusAudienciaFilter<$PrismaModel> | $Enums.StatusAudiencia
  }

  export type TrtScalarRelationFilter = {
    is?: TrtWhereInput
    isNot?: TrtWhereInput
  }

  export type PrepostoScalarRelationFilter = {
    is?: PrepostoWhereInput
    isNot?: PrepostoWhereInput
  }

  export type ImportacaoNullableScalarRelationFilter = {
    is?: ImportacaoWhereInput | null
    isNot?: ImportacaoWhereInput | null
  }

  export type HistoricoStatusListRelationFilter = {
    every?: HistoricoStatusWhereInput
    some?: HistoricoStatusWhereInput
    none?: HistoricoStatusWhereInput
  }

  export type RelatorioAudienciaNullableScalarRelationFilter = {
    is?: RelatorioAudienciaWhereInput | null
    isNot?: RelatorioAudienciaWhereInput | null
  }

  export type HistoricoStatusOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AudienciaCountOrderByAggregateInput = {
    id?: SortOrder
    numeroProcesso?: SortOrder
    reclamante?: SortOrder
    data?: SortOrder
    hora?: SortOrder
    modalidade?: SortOrder
    local?: SortOrder
    link?: SortOrder
    trtId?: SortOrder
    vara?: SortOrder
    status?: SortOrder
    prepostoId?: SortOrder
    parceiroId?: SortOrder
    importacaoId?: SortOrder
    observacoes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AudienciaMaxOrderByAggregateInput = {
    id?: SortOrder
    numeroProcesso?: SortOrder
    reclamante?: SortOrder
    data?: SortOrder
    hora?: SortOrder
    modalidade?: SortOrder
    local?: SortOrder
    link?: SortOrder
    trtId?: SortOrder
    vara?: SortOrder
    status?: SortOrder
    prepostoId?: SortOrder
    parceiroId?: SortOrder
    importacaoId?: SortOrder
    observacoes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AudienciaMinOrderByAggregateInput = {
    id?: SortOrder
    numeroProcesso?: SortOrder
    reclamante?: SortOrder
    data?: SortOrder
    hora?: SortOrder
    modalidade?: SortOrder
    local?: SortOrder
    link?: SortOrder
    trtId?: SortOrder
    vara?: SortOrder
    status?: SortOrder
    prepostoId?: SortOrder
    parceiroId?: SortOrder
    importacaoId?: SortOrder
    observacoes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumModalidadeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Modalidade | EnumModalidadeFieldRefInput<$PrismaModel>
    in?: $Enums.Modalidade[] | ListEnumModalidadeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Modalidade[] | ListEnumModalidadeFieldRefInput<$PrismaModel>
    not?: NestedEnumModalidadeWithAggregatesFilter<$PrismaModel> | $Enums.Modalidade
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumModalidadeFilter<$PrismaModel>
    _max?: NestedEnumModalidadeFilter<$PrismaModel>
  }

  export type EnumStatusAudienciaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusAudiencia | EnumStatusAudienciaFieldRefInput<$PrismaModel>
    in?: $Enums.StatusAudiencia[] | ListEnumStatusAudienciaFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusAudiencia[] | ListEnumStatusAudienciaFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusAudienciaWithAggregatesFilter<$PrismaModel> | $Enums.StatusAudiencia
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusAudienciaFilter<$PrismaModel>
    _max?: NestedEnumStatusAudienciaFilter<$PrismaModel>
  }

  export type EnumTipoMensagemFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoMensagem | EnumTipoMensagemFieldRefInput<$PrismaModel>
    in?: $Enums.TipoMensagem[] | ListEnumTipoMensagemFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoMensagem[] | ListEnumTipoMensagemFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoMensagemFilter<$PrismaModel> | $Enums.TipoMensagem
  }

  export type EnumDirecaoMensagemFilter<$PrismaModel = never> = {
    equals?: $Enums.DirecaoMensagem | EnumDirecaoMensagemFieldRefInput<$PrismaModel>
    in?: $Enums.DirecaoMensagem[] | ListEnumDirecaoMensagemFieldRefInput<$PrismaModel>
    notIn?: $Enums.DirecaoMensagem[] | ListEnumDirecaoMensagemFieldRefInput<$PrismaModel>
    not?: NestedEnumDirecaoMensagemFilter<$PrismaModel> | $Enums.DirecaoMensagem
  }

  export type EnumStatusEnvioMensagemFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusEnvioMensagem | EnumStatusEnvioMensagemFieldRefInput<$PrismaModel>
    in?: $Enums.StatusEnvioMensagem[] | ListEnumStatusEnvioMensagemFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusEnvioMensagem[] | ListEnumStatusEnvioMensagemFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusEnvioMensagemFilter<$PrismaModel> | $Enums.StatusEnvioMensagem
  }

  export type AudienciaScalarRelationFilter = {
    is?: AudienciaWhereInput
    isNot?: AudienciaWhereInput
  }

  export type PrepostoNullableScalarRelationFilter = {
    is?: PrepostoWhereInput | null
    isNot?: PrepostoWhereInput | null
  }

  export type ContatoParceiroNullableScalarRelationFilter = {
    is?: ContatoParceiroWhereInput | null
    isNot?: ContatoParceiroWhereInput | null
  }

  export type MensagemCountOrderByAggregateInput = {
    id?: SortOrder
    audienciaId?: SortOrder
    prepostoId?: SortOrder
    contatoParceiroId?: SortOrder
    tipo?: SortOrder
    direcao?: SortOrder
    conteudo?: SortOrder
    respostaBotao?: SortOrder
    observacao?: SortOrder
    whatsappMessageId?: SortOrder
    statusEnvio?: SortOrder
    createdAt?: SortOrder
  }

  export type MensagemMaxOrderByAggregateInput = {
    id?: SortOrder
    audienciaId?: SortOrder
    prepostoId?: SortOrder
    contatoParceiroId?: SortOrder
    tipo?: SortOrder
    direcao?: SortOrder
    conteudo?: SortOrder
    respostaBotao?: SortOrder
    observacao?: SortOrder
    whatsappMessageId?: SortOrder
    statusEnvio?: SortOrder
    createdAt?: SortOrder
  }

  export type MensagemMinOrderByAggregateInput = {
    id?: SortOrder
    audienciaId?: SortOrder
    prepostoId?: SortOrder
    contatoParceiroId?: SortOrder
    tipo?: SortOrder
    direcao?: SortOrder
    conteudo?: SortOrder
    respostaBotao?: SortOrder
    observacao?: SortOrder
    whatsappMessageId?: SortOrder
    statusEnvio?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumTipoMensagemWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoMensagem | EnumTipoMensagemFieldRefInput<$PrismaModel>
    in?: $Enums.TipoMensagem[] | ListEnumTipoMensagemFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoMensagem[] | ListEnumTipoMensagemFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoMensagemWithAggregatesFilter<$PrismaModel> | $Enums.TipoMensagem
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoMensagemFilter<$PrismaModel>
    _max?: NestedEnumTipoMensagemFilter<$PrismaModel>
  }

  export type EnumDirecaoMensagemWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DirecaoMensagem | EnumDirecaoMensagemFieldRefInput<$PrismaModel>
    in?: $Enums.DirecaoMensagem[] | ListEnumDirecaoMensagemFieldRefInput<$PrismaModel>
    notIn?: $Enums.DirecaoMensagem[] | ListEnumDirecaoMensagemFieldRefInput<$PrismaModel>
    not?: NestedEnumDirecaoMensagemWithAggregatesFilter<$PrismaModel> | $Enums.DirecaoMensagem
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDirecaoMensagemFilter<$PrismaModel>
    _max?: NestedEnumDirecaoMensagemFilter<$PrismaModel>
  }

  export type EnumStatusEnvioMensagemWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusEnvioMensagem | EnumStatusEnvioMensagemFieldRefInput<$PrismaModel>
    in?: $Enums.StatusEnvioMensagem[] | ListEnumStatusEnvioMensagemFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusEnvioMensagem[] | ListEnumStatusEnvioMensagemFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusEnvioMensagemWithAggregatesFilter<$PrismaModel> | $Enums.StatusEnvioMensagem
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusEnvioMensagemFilter<$PrismaModel>
    _max?: NestedEnumStatusEnvioMensagemFilter<$PrismaModel>
  }

  export type EnumOcorrenciaAudienciaNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.OcorrenciaAudiencia | EnumOcorrenciaAudienciaFieldRefInput<$PrismaModel> | null
    in?: $Enums.OcorrenciaAudiencia[] | ListEnumOcorrenciaAudienciaFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.OcorrenciaAudiencia[] | ListEnumOcorrenciaAudienciaFieldRefInput<$PrismaModel> | null
    not?: NestedEnumOcorrenciaAudienciaNullableFilter<$PrismaModel> | $Enums.OcorrenciaAudiencia | null
  }

  export type EnumResultadoAudienciaNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ResultadoAudiencia | EnumResultadoAudienciaFieldRefInput<$PrismaModel> | null
    in?: $Enums.ResultadoAudiencia[] | ListEnumResultadoAudienciaFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ResultadoAudiencia[] | ListEnumResultadoAudienciaFieldRefInput<$PrismaModel> | null
    not?: NestedEnumResultadoAudienciaNullableFilter<$PrismaModel> | $Enums.ResultadoAudiencia | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type RelatorioAudienciaCountOrderByAggregateInput = {
    id?: SortOrder
    audienciaId?: SortOrder
    audienciaOcorreu?: SortOrder
    resultado?: SortOrder
    advogadoPresente?: SortOrder
    advogadoDominioCaso?: SortOrder
    problemaRelevante?: SortOrder
    relato?: SortOrder
    createdAt?: SortOrder
  }

  export type RelatorioAudienciaMaxOrderByAggregateInput = {
    id?: SortOrder
    audienciaId?: SortOrder
    audienciaOcorreu?: SortOrder
    resultado?: SortOrder
    advogadoPresente?: SortOrder
    advogadoDominioCaso?: SortOrder
    problemaRelevante?: SortOrder
    relato?: SortOrder
    createdAt?: SortOrder
  }

  export type RelatorioAudienciaMinOrderByAggregateInput = {
    id?: SortOrder
    audienciaId?: SortOrder
    audienciaOcorreu?: SortOrder
    resultado?: SortOrder
    advogadoPresente?: SortOrder
    advogadoDominioCaso?: SortOrder
    problemaRelevante?: SortOrder
    relato?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumOcorrenciaAudienciaNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OcorrenciaAudiencia | EnumOcorrenciaAudienciaFieldRefInput<$PrismaModel> | null
    in?: $Enums.OcorrenciaAudiencia[] | ListEnumOcorrenciaAudienciaFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.OcorrenciaAudiencia[] | ListEnumOcorrenciaAudienciaFieldRefInput<$PrismaModel> | null
    not?: NestedEnumOcorrenciaAudienciaNullableWithAggregatesFilter<$PrismaModel> | $Enums.OcorrenciaAudiencia | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumOcorrenciaAudienciaNullableFilter<$PrismaModel>
    _max?: NestedEnumOcorrenciaAudienciaNullableFilter<$PrismaModel>
  }

  export type EnumResultadoAudienciaNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ResultadoAudiencia | EnumResultadoAudienciaFieldRefInput<$PrismaModel> | null
    in?: $Enums.ResultadoAudiencia[] | ListEnumResultadoAudienciaFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ResultadoAudiencia[] | ListEnumResultadoAudienciaFieldRefInput<$PrismaModel> | null
    not?: NestedEnumResultadoAudienciaNullableWithAggregatesFilter<$PrismaModel> | $Enums.ResultadoAudiencia | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumResultadoAudienciaNullableFilter<$PrismaModel>
    _max?: NestedEnumResultadoAudienciaNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type HistoricoStatusCountOrderByAggregateInput = {
    id?: SortOrder
    audienciaId?: SortOrder
    statusAnterior?: SortOrder
    statusNovo?: SortOrder
    motivo?: SortOrder
    atualizadoPor?: SortOrder
    createdAt?: SortOrder
  }

  export type HistoricoStatusMaxOrderByAggregateInput = {
    id?: SortOrder
    audienciaId?: SortOrder
    statusAnterior?: SortOrder
    statusNovo?: SortOrder
    motivo?: SortOrder
    atualizadoPor?: SortOrder
    createdAt?: SortOrder
  }

  export type HistoricoStatusMinOrderByAggregateInput = {
    id?: SortOrder
    audienciaId?: SortOrder
    statusAnterior?: SortOrder
    statusNovo?: SortOrder
    motivo?: SortOrder
    atualizadoPor?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumStatusSubstituicaoFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusSubstituicao | EnumStatusSubstituicaoFieldRefInput<$PrismaModel>
    in?: $Enums.StatusSubstituicao[] | ListEnumStatusSubstituicaoFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusSubstituicao[] | ListEnumStatusSubstituicaoFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusSubstituicaoFilter<$PrismaModel> | $Enums.StatusSubstituicao
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SubstituicaoCountOrderByAggregateInput = {
    id?: SortOrder
    audienciaId?: SortOrder
    prepostoAnteriorId?: SortOrder
    prepostoNovoId?: SortOrder
    motivo?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    resolvidoEm?: SortOrder
  }

  export type SubstituicaoMaxOrderByAggregateInput = {
    id?: SortOrder
    audienciaId?: SortOrder
    prepostoAnteriorId?: SortOrder
    prepostoNovoId?: SortOrder
    motivo?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    resolvidoEm?: SortOrder
  }

  export type SubstituicaoMinOrderByAggregateInput = {
    id?: SortOrder
    audienciaId?: SortOrder
    prepostoAnteriorId?: SortOrder
    prepostoNovoId?: SortOrder
    motivo?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    resolvidoEm?: SortOrder
  }

  export type EnumStatusSubstituicaoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusSubstituicao | EnumStatusSubstituicaoFieldRefInput<$PrismaModel>
    in?: $Enums.StatusSubstituicao[] | ListEnumStatusSubstituicaoFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusSubstituicao[] | ListEnumStatusSubstituicaoFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusSubstituicaoWithAggregatesFilter<$PrismaModel> | $Enums.StatusSubstituicao
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusSubstituicaoFilter<$PrismaModel>
    _max?: NestedEnumStatusSubstituicaoFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleUsuarioFieldUpdateOperationsInput = {
    set?: $Enums.RoleUsuario
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AudienciaCreateNestedManyWithoutTrtInput = {
    create?: XOR<AudienciaCreateWithoutTrtInput, AudienciaUncheckedCreateWithoutTrtInput> | AudienciaCreateWithoutTrtInput[] | AudienciaUncheckedCreateWithoutTrtInput[]
    connectOrCreate?: AudienciaCreateOrConnectWithoutTrtInput | AudienciaCreateOrConnectWithoutTrtInput[]
    createMany?: AudienciaCreateManyTrtInputEnvelope
    connect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
  }

  export type AudienciaUncheckedCreateNestedManyWithoutTrtInput = {
    create?: XOR<AudienciaCreateWithoutTrtInput, AudienciaUncheckedCreateWithoutTrtInput> | AudienciaCreateWithoutTrtInput[] | AudienciaUncheckedCreateWithoutTrtInput[]
    connectOrCreate?: AudienciaCreateOrConnectWithoutTrtInput | AudienciaCreateOrConnectWithoutTrtInput[]
    createMany?: AudienciaCreateManyTrtInputEnvelope
    connect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
  }

  export type AudienciaUpdateManyWithoutTrtNestedInput = {
    create?: XOR<AudienciaCreateWithoutTrtInput, AudienciaUncheckedCreateWithoutTrtInput> | AudienciaCreateWithoutTrtInput[] | AudienciaUncheckedCreateWithoutTrtInput[]
    connectOrCreate?: AudienciaCreateOrConnectWithoutTrtInput | AudienciaCreateOrConnectWithoutTrtInput[]
    upsert?: AudienciaUpsertWithWhereUniqueWithoutTrtInput | AudienciaUpsertWithWhereUniqueWithoutTrtInput[]
    createMany?: AudienciaCreateManyTrtInputEnvelope
    set?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    disconnect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    delete?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    connect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    update?: AudienciaUpdateWithWhereUniqueWithoutTrtInput | AudienciaUpdateWithWhereUniqueWithoutTrtInput[]
    updateMany?: AudienciaUpdateManyWithWhereWithoutTrtInput | AudienciaUpdateManyWithWhereWithoutTrtInput[]
    deleteMany?: AudienciaScalarWhereInput | AudienciaScalarWhereInput[]
  }

  export type AudienciaUncheckedUpdateManyWithoutTrtNestedInput = {
    create?: XOR<AudienciaCreateWithoutTrtInput, AudienciaUncheckedCreateWithoutTrtInput> | AudienciaCreateWithoutTrtInput[] | AudienciaUncheckedCreateWithoutTrtInput[]
    connectOrCreate?: AudienciaCreateOrConnectWithoutTrtInput | AudienciaCreateOrConnectWithoutTrtInput[]
    upsert?: AudienciaUpsertWithWhereUniqueWithoutTrtInput | AudienciaUpsertWithWhereUniqueWithoutTrtInput[]
    createMany?: AudienciaCreateManyTrtInputEnvelope
    set?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    disconnect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    delete?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    connect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    update?: AudienciaUpdateWithWhereUniqueWithoutTrtInput | AudienciaUpdateWithWhereUniqueWithoutTrtInput[]
    updateMany?: AudienciaUpdateManyWithWhereWithoutTrtInput | AudienciaUpdateManyWithWhereWithoutTrtInput[]
    deleteMany?: AudienciaScalarWhereInput | AudienciaScalarWhereInput[]
  }

  export type AudienciaCreateNestedManyWithoutPrepostoInput = {
    create?: XOR<AudienciaCreateWithoutPrepostoInput, AudienciaUncheckedCreateWithoutPrepostoInput> | AudienciaCreateWithoutPrepostoInput[] | AudienciaUncheckedCreateWithoutPrepostoInput[]
    connectOrCreate?: AudienciaCreateOrConnectWithoutPrepostoInput | AudienciaCreateOrConnectWithoutPrepostoInput[]
    createMany?: AudienciaCreateManyPrepostoInputEnvelope
    connect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
  }

  export type MensagemCreateNestedManyWithoutPrepostoInput = {
    create?: XOR<MensagemCreateWithoutPrepostoInput, MensagemUncheckedCreateWithoutPrepostoInput> | MensagemCreateWithoutPrepostoInput[] | MensagemUncheckedCreateWithoutPrepostoInput[]
    connectOrCreate?: MensagemCreateOrConnectWithoutPrepostoInput | MensagemCreateOrConnectWithoutPrepostoInput[]
    createMany?: MensagemCreateManyPrepostoInputEnvelope
    connect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
  }

  export type SubstituicaoCreateNestedManyWithoutPrepostoAnteriorInput = {
    create?: XOR<SubstituicaoCreateWithoutPrepostoAnteriorInput, SubstituicaoUncheckedCreateWithoutPrepostoAnteriorInput> | SubstituicaoCreateWithoutPrepostoAnteriorInput[] | SubstituicaoUncheckedCreateWithoutPrepostoAnteriorInput[]
    connectOrCreate?: SubstituicaoCreateOrConnectWithoutPrepostoAnteriorInput | SubstituicaoCreateOrConnectWithoutPrepostoAnteriorInput[]
    createMany?: SubstituicaoCreateManyPrepostoAnteriorInputEnvelope
    connect?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
  }

  export type SubstituicaoCreateNestedManyWithoutPrepostoNovoInput = {
    create?: XOR<SubstituicaoCreateWithoutPrepostoNovoInput, SubstituicaoUncheckedCreateWithoutPrepostoNovoInput> | SubstituicaoCreateWithoutPrepostoNovoInput[] | SubstituicaoUncheckedCreateWithoutPrepostoNovoInput[]
    connectOrCreate?: SubstituicaoCreateOrConnectWithoutPrepostoNovoInput | SubstituicaoCreateOrConnectWithoutPrepostoNovoInput[]
    createMany?: SubstituicaoCreateManyPrepostoNovoInputEnvelope
    connect?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
  }

  export type AudienciaUncheckedCreateNestedManyWithoutPrepostoInput = {
    create?: XOR<AudienciaCreateWithoutPrepostoInput, AudienciaUncheckedCreateWithoutPrepostoInput> | AudienciaCreateWithoutPrepostoInput[] | AudienciaUncheckedCreateWithoutPrepostoInput[]
    connectOrCreate?: AudienciaCreateOrConnectWithoutPrepostoInput | AudienciaCreateOrConnectWithoutPrepostoInput[]
    createMany?: AudienciaCreateManyPrepostoInputEnvelope
    connect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
  }

  export type MensagemUncheckedCreateNestedManyWithoutPrepostoInput = {
    create?: XOR<MensagemCreateWithoutPrepostoInput, MensagemUncheckedCreateWithoutPrepostoInput> | MensagemCreateWithoutPrepostoInput[] | MensagemUncheckedCreateWithoutPrepostoInput[]
    connectOrCreate?: MensagemCreateOrConnectWithoutPrepostoInput | MensagemCreateOrConnectWithoutPrepostoInput[]
    createMany?: MensagemCreateManyPrepostoInputEnvelope
    connect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
  }

  export type SubstituicaoUncheckedCreateNestedManyWithoutPrepostoAnteriorInput = {
    create?: XOR<SubstituicaoCreateWithoutPrepostoAnteriorInput, SubstituicaoUncheckedCreateWithoutPrepostoAnteriorInput> | SubstituicaoCreateWithoutPrepostoAnteriorInput[] | SubstituicaoUncheckedCreateWithoutPrepostoAnteriorInput[]
    connectOrCreate?: SubstituicaoCreateOrConnectWithoutPrepostoAnteriorInput | SubstituicaoCreateOrConnectWithoutPrepostoAnteriorInput[]
    createMany?: SubstituicaoCreateManyPrepostoAnteriorInputEnvelope
    connect?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
  }

  export type SubstituicaoUncheckedCreateNestedManyWithoutPrepostoNovoInput = {
    create?: XOR<SubstituicaoCreateWithoutPrepostoNovoInput, SubstituicaoUncheckedCreateWithoutPrepostoNovoInput> | SubstituicaoCreateWithoutPrepostoNovoInput[] | SubstituicaoUncheckedCreateWithoutPrepostoNovoInput[]
    connectOrCreate?: SubstituicaoCreateOrConnectWithoutPrepostoNovoInput | SubstituicaoCreateOrConnectWithoutPrepostoNovoInput[]
    createMany?: SubstituicaoCreateManyPrepostoNovoInputEnvelope
    connect?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type AudienciaUpdateManyWithoutPrepostoNestedInput = {
    create?: XOR<AudienciaCreateWithoutPrepostoInput, AudienciaUncheckedCreateWithoutPrepostoInput> | AudienciaCreateWithoutPrepostoInput[] | AudienciaUncheckedCreateWithoutPrepostoInput[]
    connectOrCreate?: AudienciaCreateOrConnectWithoutPrepostoInput | AudienciaCreateOrConnectWithoutPrepostoInput[]
    upsert?: AudienciaUpsertWithWhereUniqueWithoutPrepostoInput | AudienciaUpsertWithWhereUniqueWithoutPrepostoInput[]
    createMany?: AudienciaCreateManyPrepostoInputEnvelope
    set?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    disconnect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    delete?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    connect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    update?: AudienciaUpdateWithWhereUniqueWithoutPrepostoInput | AudienciaUpdateWithWhereUniqueWithoutPrepostoInput[]
    updateMany?: AudienciaUpdateManyWithWhereWithoutPrepostoInput | AudienciaUpdateManyWithWhereWithoutPrepostoInput[]
    deleteMany?: AudienciaScalarWhereInput | AudienciaScalarWhereInput[]
  }

  export type MensagemUpdateManyWithoutPrepostoNestedInput = {
    create?: XOR<MensagemCreateWithoutPrepostoInput, MensagemUncheckedCreateWithoutPrepostoInput> | MensagemCreateWithoutPrepostoInput[] | MensagemUncheckedCreateWithoutPrepostoInput[]
    connectOrCreate?: MensagemCreateOrConnectWithoutPrepostoInput | MensagemCreateOrConnectWithoutPrepostoInput[]
    upsert?: MensagemUpsertWithWhereUniqueWithoutPrepostoInput | MensagemUpsertWithWhereUniqueWithoutPrepostoInput[]
    createMany?: MensagemCreateManyPrepostoInputEnvelope
    set?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    disconnect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    delete?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    connect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    update?: MensagemUpdateWithWhereUniqueWithoutPrepostoInput | MensagemUpdateWithWhereUniqueWithoutPrepostoInput[]
    updateMany?: MensagemUpdateManyWithWhereWithoutPrepostoInput | MensagemUpdateManyWithWhereWithoutPrepostoInput[]
    deleteMany?: MensagemScalarWhereInput | MensagemScalarWhereInput[]
  }

  export type SubstituicaoUpdateManyWithoutPrepostoAnteriorNestedInput = {
    create?: XOR<SubstituicaoCreateWithoutPrepostoAnteriorInput, SubstituicaoUncheckedCreateWithoutPrepostoAnteriorInput> | SubstituicaoCreateWithoutPrepostoAnteriorInput[] | SubstituicaoUncheckedCreateWithoutPrepostoAnteriorInput[]
    connectOrCreate?: SubstituicaoCreateOrConnectWithoutPrepostoAnteriorInput | SubstituicaoCreateOrConnectWithoutPrepostoAnteriorInput[]
    upsert?: SubstituicaoUpsertWithWhereUniqueWithoutPrepostoAnteriorInput | SubstituicaoUpsertWithWhereUniqueWithoutPrepostoAnteriorInput[]
    createMany?: SubstituicaoCreateManyPrepostoAnteriorInputEnvelope
    set?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    disconnect?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    delete?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    connect?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    update?: SubstituicaoUpdateWithWhereUniqueWithoutPrepostoAnteriorInput | SubstituicaoUpdateWithWhereUniqueWithoutPrepostoAnteriorInput[]
    updateMany?: SubstituicaoUpdateManyWithWhereWithoutPrepostoAnteriorInput | SubstituicaoUpdateManyWithWhereWithoutPrepostoAnteriorInput[]
    deleteMany?: SubstituicaoScalarWhereInput | SubstituicaoScalarWhereInput[]
  }

  export type SubstituicaoUpdateManyWithoutPrepostoNovoNestedInput = {
    create?: XOR<SubstituicaoCreateWithoutPrepostoNovoInput, SubstituicaoUncheckedCreateWithoutPrepostoNovoInput> | SubstituicaoCreateWithoutPrepostoNovoInput[] | SubstituicaoUncheckedCreateWithoutPrepostoNovoInput[]
    connectOrCreate?: SubstituicaoCreateOrConnectWithoutPrepostoNovoInput | SubstituicaoCreateOrConnectWithoutPrepostoNovoInput[]
    upsert?: SubstituicaoUpsertWithWhereUniqueWithoutPrepostoNovoInput | SubstituicaoUpsertWithWhereUniqueWithoutPrepostoNovoInput[]
    createMany?: SubstituicaoCreateManyPrepostoNovoInputEnvelope
    set?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    disconnect?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    delete?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    connect?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    update?: SubstituicaoUpdateWithWhereUniqueWithoutPrepostoNovoInput | SubstituicaoUpdateWithWhereUniqueWithoutPrepostoNovoInput[]
    updateMany?: SubstituicaoUpdateManyWithWhereWithoutPrepostoNovoInput | SubstituicaoUpdateManyWithWhereWithoutPrepostoNovoInput[]
    deleteMany?: SubstituicaoScalarWhereInput | SubstituicaoScalarWhereInput[]
  }

  export type AudienciaUncheckedUpdateManyWithoutPrepostoNestedInput = {
    create?: XOR<AudienciaCreateWithoutPrepostoInput, AudienciaUncheckedCreateWithoutPrepostoInput> | AudienciaCreateWithoutPrepostoInput[] | AudienciaUncheckedCreateWithoutPrepostoInput[]
    connectOrCreate?: AudienciaCreateOrConnectWithoutPrepostoInput | AudienciaCreateOrConnectWithoutPrepostoInput[]
    upsert?: AudienciaUpsertWithWhereUniqueWithoutPrepostoInput | AudienciaUpsertWithWhereUniqueWithoutPrepostoInput[]
    createMany?: AudienciaCreateManyPrepostoInputEnvelope
    set?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    disconnect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    delete?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    connect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    update?: AudienciaUpdateWithWhereUniqueWithoutPrepostoInput | AudienciaUpdateWithWhereUniqueWithoutPrepostoInput[]
    updateMany?: AudienciaUpdateManyWithWhereWithoutPrepostoInput | AudienciaUpdateManyWithWhereWithoutPrepostoInput[]
    deleteMany?: AudienciaScalarWhereInput | AudienciaScalarWhereInput[]
  }

  export type MensagemUncheckedUpdateManyWithoutPrepostoNestedInput = {
    create?: XOR<MensagemCreateWithoutPrepostoInput, MensagemUncheckedCreateWithoutPrepostoInput> | MensagemCreateWithoutPrepostoInput[] | MensagemUncheckedCreateWithoutPrepostoInput[]
    connectOrCreate?: MensagemCreateOrConnectWithoutPrepostoInput | MensagemCreateOrConnectWithoutPrepostoInput[]
    upsert?: MensagemUpsertWithWhereUniqueWithoutPrepostoInput | MensagemUpsertWithWhereUniqueWithoutPrepostoInput[]
    createMany?: MensagemCreateManyPrepostoInputEnvelope
    set?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    disconnect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    delete?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    connect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    update?: MensagemUpdateWithWhereUniqueWithoutPrepostoInput | MensagemUpdateWithWhereUniqueWithoutPrepostoInput[]
    updateMany?: MensagemUpdateManyWithWhereWithoutPrepostoInput | MensagemUpdateManyWithWhereWithoutPrepostoInput[]
    deleteMany?: MensagemScalarWhereInput | MensagemScalarWhereInput[]
  }

  export type SubstituicaoUncheckedUpdateManyWithoutPrepostoAnteriorNestedInput = {
    create?: XOR<SubstituicaoCreateWithoutPrepostoAnteriorInput, SubstituicaoUncheckedCreateWithoutPrepostoAnteriorInput> | SubstituicaoCreateWithoutPrepostoAnteriorInput[] | SubstituicaoUncheckedCreateWithoutPrepostoAnteriorInput[]
    connectOrCreate?: SubstituicaoCreateOrConnectWithoutPrepostoAnteriorInput | SubstituicaoCreateOrConnectWithoutPrepostoAnteriorInput[]
    upsert?: SubstituicaoUpsertWithWhereUniqueWithoutPrepostoAnteriorInput | SubstituicaoUpsertWithWhereUniqueWithoutPrepostoAnteriorInput[]
    createMany?: SubstituicaoCreateManyPrepostoAnteriorInputEnvelope
    set?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    disconnect?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    delete?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    connect?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    update?: SubstituicaoUpdateWithWhereUniqueWithoutPrepostoAnteriorInput | SubstituicaoUpdateWithWhereUniqueWithoutPrepostoAnteriorInput[]
    updateMany?: SubstituicaoUpdateManyWithWhereWithoutPrepostoAnteriorInput | SubstituicaoUpdateManyWithWhereWithoutPrepostoAnteriorInput[]
    deleteMany?: SubstituicaoScalarWhereInput | SubstituicaoScalarWhereInput[]
  }

  export type SubstituicaoUncheckedUpdateManyWithoutPrepostoNovoNestedInput = {
    create?: XOR<SubstituicaoCreateWithoutPrepostoNovoInput, SubstituicaoUncheckedCreateWithoutPrepostoNovoInput> | SubstituicaoCreateWithoutPrepostoNovoInput[] | SubstituicaoUncheckedCreateWithoutPrepostoNovoInput[]
    connectOrCreate?: SubstituicaoCreateOrConnectWithoutPrepostoNovoInput | SubstituicaoCreateOrConnectWithoutPrepostoNovoInput[]
    upsert?: SubstituicaoUpsertWithWhereUniqueWithoutPrepostoNovoInput | SubstituicaoUpsertWithWhereUniqueWithoutPrepostoNovoInput[]
    createMany?: SubstituicaoCreateManyPrepostoNovoInputEnvelope
    set?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    disconnect?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    delete?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    connect?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    update?: SubstituicaoUpdateWithWhereUniqueWithoutPrepostoNovoInput | SubstituicaoUpdateWithWhereUniqueWithoutPrepostoNovoInput[]
    updateMany?: SubstituicaoUpdateManyWithWhereWithoutPrepostoNovoInput | SubstituicaoUpdateManyWithWhereWithoutPrepostoNovoInput[]
    deleteMany?: SubstituicaoScalarWhereInput | SubstituicaoScalarWhereInput[]
  }

  export type ContatoParceiroCreateNestedManyWithoutParceiroInput = {
    create?: XOR<ContatoParceiroCreateWithoutParceiroInput, ContatoParceiroUncheckedCreateWithoutParceiroInput> | ContatoParceiroCreateWithoutParceiroInput[] | ContatoParceiroUncheckedCreateWithoutParceiroInput[]
    connectOrCreate?: ContatoParceiroCreateOrConnectWithoutParceiroInput | ContatoParceiroCreateOrConnectWithoutParceiroInput[]
    createMany?: ContatoParceiroCreateManyParceiroInputEnvelope
    connect?: ContatoParceiroWhereUniqueInput | ContatoParceiroWhereUniqueInput[]
  }

  export type AudienciaCreateNestedManyWithoutParceiroInput = {
    create?: XOR<AudienciaCreateWithoutParceiroInput, AudienciaUncheckedCreateWithoutParceiroInput> | AudienciaCreateWithoutParceiroInput[] | AudienciaUncheckedCreateWithoutParceiroInput[]
    connectOrCreate?: AudienciaCreateOrConnectWithoutParceiroInput | AudienciaCreateOrConnectWithoutParceiroInput[]
    createMany?: AudienciaCreateManyParceiroInputEnvelope
    connect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
  }

  export type ContatoParceiroUncheckedCreateNestedManyWithoutParceiroInput = {
    create?: XOR<ContatoParceiroCreateWithoutParceiroInput, ContatoParceiroUncheckedCreateWithoutParceiroInput> | ContatoParceiroCreateWithoutParceiroInput[] | ContatoParceiroUncheckedCreateWithoutParceiroInput[]
    connectOrCreate?: ContatoParceiroCreateOrConnectWithoutParceiroInput | ContatoParceiroCreateOrConnectWithoutParceiroInput[]
    createMany?: ContatoParceiroCreateManyParceiroInputEnvelope
    connect?: ContatoParceiroWhereUniqueInput | ContatoParceiroWhereUniqueInput[]
  }

  export type AudienciaUncheckedCreateNestedManyWithoutParceiroInput = {
    create?: XOR<AudienciaCreateWithoutParceiroInput, AudienciaUncheckedCreateWithoutParceiroInput> | AudienciaCreateWithoutParceiroInput[] | AudienciaUncheckedCreateWithoutParceiroInput[]
    connectOrCreate?: AudienciaCreateOrConnectWithoutParceiroInput | AudienciaCreateOrConnectWithoutParceiroInput[]
    createMany?: AudienciaCreateManyParceiroInputEnvelope
    connect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
  }

  export type ContatoParceiroUpdateManyWithoutParceiroNestedInput = {
    create?: XOR<ContatoParceiroCreateWithoutParceiroInput, ContatoParceiroUncheckedCreateWithoutParceiroInput> | ContatoParceiroCreateWithoutParceiroInput[] | ContatoParceiroUncheckedCreateWithoutParceiroInput[]
    connectOrCreate?: ContatoParceiroCreateOrConnectWithoutParceiroInput | ContatoParceiroCreateOrConnectWithoutParceiroInput[]
    upsert?: ContatoParceiroUpsertWithWhereUniqueWithoutParceiroInput | ContatoParceiroUpsertWithWhereUniqueWithoutParceiroInput[]
    createMany?: ContatoParceiroCreateManyParceiroInputEnvelope
    set?: ContatoParceiroWhereUniqueInput | ContatoParceiroWhereUniqueInput[]
    disconnect?: ContatoParceiroWhereUniqueInput | ContatoParceiroWhereUniqueInput[]
    delete?: ContatoParceiroWhereUniqueInput | ContatoParceiroWhereUniqueInput[]
    connect?: ContatoParceiroWhereUniqueInput | ContatoParceiroWhereUniqueInput[]
    update?: ContatoParceiroUpdateWithWhereUniqueWithoutParceiroInput | ContatoParceiroUpdateWithWhereUniqueWithoutParceiroInput[]
    updateMany?: ContatoParceiroUpdateManyWithWhereWithoutParceiroInput | ContatoParceiroUpdateManyWithWhereWithoutParceiroInput[]
    deleteMany?: ContatoParceiroScalarWhereInput | ContatoParceiroScalarWhereInput[]
  }

  export type AudienciaUpdateManyWithoutParceiroNestedInput = {
    create?: XOR<AudienciaCreateWithoutParceiroInput, AudienciaUncheckedCreateWithoutParceiroInput> | AudienciaCreateWithoutParceiroInput[] | AudienciaUncheckedCreateWithoutParceiroInput[]
    connectOrCreate?: AudienciaCreateOrConnectWithoutParceiroInput | AudienciaCreateOrConnectWithoutParceiroInput[]
    upsert?: AudienciaUpsertWithWhereUniqueWithoutParceiroInput | AudienciaUpsertWithWhereUniqueWithoutParceiroInput[]
    createMany?: AudienciaCreateManyParceiroInputEnvelope
    set?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    disconnect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    delete?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    connect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    update?: AudienciaUpdateWithWhereUniqueWithoutParceiroInput | AudienciaUpdateWithWhereUniqueWithoutParceiroInput[]
    updateMany?: AudienciaUpdateManyWithWhereWithoutParceiroInput | AudienciaUpdateManyWithWhereWithoutParceiroInput[]
    deleteMany?: AudienciaScalarWhereInput | AudienciaScalarWhereInput[]
  }

  export type ContatoParceiroUncheckedUpdateManyWithoutParceiroNestedInput = {
    create?: XOR<ContatoParceiroCreateWithoutParceiroInput, ContatoParceiroUncheckedCreateWithoutParceiroInput> | ContatoParceiroCreateWithoutParceiroInput[] | ContatoParceiroUncheckedCreateWithoutParceiroInput[]
    connectOrCreate?: ContatoParceiroCreateOrConnectWithoutParceiroInput | ContatoParceiroCreateOrConnectWithoutParceiroInput[]
    upsert?: ContatoParceiroUpsertWithWhereUniqueWithoutParceiroInput | ContatoParceiroUpsertWithWhereUniqueWithoutParceiroInput[]
    createMany?: ContatoParceiroCreateManyParceiroInputEnvelope
    set?: ContatoParceiroWhereUniqueInput | ContatoParceiroWhereUniqueInput[]
    disconnect?: ContatoParceiroWhereUniqueInput | ContatoParceiroWhereUniqueInput[]
    delete?: ContatoParceiroWhereUniqueInput | ContatoParceiroWhereUniqueInput[]
    connect?: ContatoParceiroWhereUniqueInput | ContatoParceiroWhereUniqueInput[]
    update?: ContatoParceiroUpdateWithWhereUniqueWithoutParceiroInput | ContatoParceiroUpdateWithWhereUniqueWithoutParceiroInput[]
    updateMany?: ContatoParceiroUpdateManyWithWhereWithoutParceiroInput | ContatoParceiroUpdateManyWithWhereWithoutParceiroInput[]
    deleteMany?: ContatoParceiroScalarWhereInput | ContatoParceiroScalarWhereInput[]
  }

  export type AudienciaUncheckedUpdateManyWithoutParceiroNestedInput = {
    create?: XOR<AudienciaCreateWithoutParceiroInput, AudienciaUncheckedCreateWithoutParceiroInput> | AudienciaCreateWithoutParceiroInput[] | AudienciaUncheckedCreateWithoutParceiroInput[]
    connectOrCreate?: AudienciaCreateOrConnectWithoutParceiroInput | AudienciaCreateOrConnectWithoutParceiroInput[]
    upsert?: AudienciaUpsertWithWhereUniqueWithoutParceiroInput | AudienciaUpsertWithWhereUniqueWithoutParceiroInput[]
    createMany?: AudienciaCreateManyParceiroInputEnvelope
    set?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    disconnect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    delete?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    connect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    update?: AudienciaUpdateWithWhereUniqueWithoutParceiroInput | AudienciaUpdateWithWhereUniqueWithoutParceiroInput[]
    updateMany?: AudienciaUpdateManyWithWhereWithoutParceiroInput | AudienciaUpdateManyWithWhereWithoutParceiroInput[]
    deleteMany?: AudienciaScalarWhereInput | AudienciaScalarWhereInput[]
  }

  export type ParceiroCreateNestedOneWithoutContatosInput = {
    create?: XOR<ParceiroCreateWithoutContatosInput, ParceiroUncheckedCreateWithoutContatosInput>
    connectOrCreate?: ParceiroCreateOrConnectWithoutContatosInput
    connect?: ParceiroWhereUniqueInput
  }

  export type MensagemCreateNestedManyWithoutContatoParceiroInput = {
    create?: XOR<MensagemCreateWithoutContatoParceiroInput, MensagemUncheckedCreateWithoutContatoParceiroInput> | MensagemCreateWithoutContatoParceiroInput[] | MensagemUncheckedCreateWithoutContatoParceiroInput[]
    connectOrCreate?: MensagemCreateOrConnectWithoutContatoParceiroInput | MensagemCreateOrConnectWithoutContatoParceiroInput[]
    createMany?: MensagemCreateManyContatoParceiroInputEnvelope
    connect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
  }

  export type MensagemUncheckedCreateNestedManyWithoutContatoParceiroInput = {
    create?: XOR<MensagemCreateWithoutContatoParceiroInput, MensagemUncheckedCreateWithoutContatoParceiroInput> | MensagemCreateWithoutContatoParceiroInput[] | MensagemUncheckedCreateWithoutContatoParceiroInput[]
    connectOrCreate?: MensagemCreateOrConnectWithoutContatoParceiroInput | MensagemCreateOrConnectWithoutContatoParceiroInput[]
    createMany?: MensagemCreateManyContatoParceiroInputEnvelope
    connect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ParceiroUpdateOneRequiredWithoutContatosNestedInput = {
    create?: XOR<ParceiroCreateWithoutContatosInput, ParceiroUncheckedCreateWithoutContatosInput>
    connectOrCreate?: ParceiroCreateOrConnectWithoutContatosInput
    upsert?: ParceiroUpsertWithoutContatosInput
    connect?: ParceiroWhereUniqueInput
    update?: XOR<XOR<ParceiroUpdateToOneWithWhereWithoutContatosInput, ParceiroUpdateWithoutContatosInput>, ParceiroUncheckedUpdateWithoutContatosInput>
  }

  export type MensagemUpdateManyWithoutContatoParceiroNestedInput = {
    create?: XOR<MensagemCreateWithoutContatoParceiroInput, MensagemUncheckedCreateWithoutContatoParceiroInput> | MensagemCreateWithoutContatoParceiroInput[] | MensagemUncheckedCreateWithoutContatoParceiroInput[]
    connectOrCreate?: MensagemCreateOrConnectWithoutContatoParceiroInput | MensagemCreateOrConnectWithoutContatoParceiroInput[]
    upsert?: MensagemUpsertWithWhereUniqueWithoutContatoParceiroInput | MensagemUpsertWithWhereUniqueWithoutContatoParceiroInput[]
    createMany?: MensagemCreateManyContatoParceiroInputEnvelope
    set?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    disconnect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    delete?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    connect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    update?: MensagemUpdateWithWhereUniqueWithoutContatoParceiroInput | MensagemUpdateWithWhereUniqueWithoutContatoParceiroInput[]
    updateMany?: MensagemUpdateManyWithWhereWithoutContatoParceiroInput | MensagemUpdateManyWithWhereWithoutContatoParceiroInput[]
    deleteMany?: MensagemScalarWhereInput | MensagemScalarWhereInput[]
  }

  export type MensagemUncheckedUpdateManyWithoutContatoParceiroNestedInput = {
    create?: XOR<MensagemCreateWithoutContatoParceiroInput, MensagemUncheckedCreateWithoutContatoParceiroInput> | MensagemCreateWithoutContatoParceiroInput[] | MensagemUncheckedCreateWithoutContatoParceiroInput[]
    connectOrCreate?: MensagemCreateOrConnectWithoutContatoParceiroInput | MensagemCreateOrConnectWithoutContatoParceiroInput[]
    upsert?: MensagemUpsertWithWhereUniqueWithoutContatoParceiroInput | MensagemUpsertWithWhereUniqueWithoutContatoParceiroInput[]
    createMany?: MensagemCreateManyContatoParceiroInputEnvelope
    set?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    disconnect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    delete?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    connect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    update?: MensagemUpdateWithWhereUniqueWithoutContatoParceiroInput | MensagemUpdateWithWhereUniqueWithoutContatoParceiroInput[]
    updateMany?: MensagemUpdateManyWithWhereWithoutContatoParceiroInput | MensagemUpdateManyWithWhereWithoutContatoParceiroInput[]
    deleteMany?: MensagemScalarWhereInput | MensagemScalarWhereInput[]
  }

  export type AudienciaCreateNestedManyWithoutImportacaoInput = {
    create?: XOR<AudienciaCreateWithoutImportacaoInput, AudienciaUncheckedCreateWithoutImportacaoInput> | AudienciaCreateWithoutImportacaoInput[] | AudienciaUncheckedCreateWithoutImportacaoInput[]
    connectOrCreate?: AudienciaCreateOrConnectWithoutImportacaoInput | AudienciaCreateOrConnectWithoutImportacaoInput[]
    createMany?: AudienciaCreateManyImportacaoInputEnvelope
    connect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
  }

  export type AudienciaUncheckedCreateNestedManyWithoutImportacaoInput = {
    create?: XOR<AudienciaCreateWithoutImportacaoInput, AudienciaUncheckedCreateWithoutImportacaoInput> | AudienciaCreateWithoutImportacaoInput[] | AudienciaUncheckedCreateWithoutImportacaoInput[]
    connectOrCreate?: AudienciaCreateOrConnectWithoutImportacaoInput | AudienciaCreateOrConnectWithoutImportacaoInput[]
    createMany?: AudienciaCreateManyImportacaoInputEnvelope
    connect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
  }

  export type EnumStatusImportacaoFieldUpdateOperationsInput = {
    set?: $Enums.StatusImportacao
  }

  export type AudienciaUpdateManyWithoutImportacaoNestedInput = {
    create?: XOR<AudienciaCreateWithoutImportacaoInput, AudienciaUncheckedCreateWithoutImportacaoInput> | AudienciaCreateWithoutImportacaoInput[] | AudienciaUncheckedCreateWithoutImportacaoInput[]
    connectOrCreate?: AudienciaCreateOrConnectWithoutImportacaoInput | AudienciaCreateOrConnectWithoutImportacaoInput[]
    upsert?: AudienciaUpsertWithWhereUniqueWithoutImportacaoInput | AudienciaUpsertWithWhereUniqueWithoutImportacaoInput[]
    createMany?: AudienciaCreateManyImportacaoInputEnvelope
    set?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    disconnect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    delete?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    connect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    update?: AudienciaUpdateWithWhereUniqueWithoutImportacaoInput | AudienciaUpdateWithWhereUniqueWithoutImportacaoInput[]
    updateMany?: AudienciaUpdateManyWithWhereWithoutImportacaoInput | AudienciaUpdateManyWithWhereWithoutImportacaoInput[]
    deleteMany?: AudienciaScalarWhereInput | AudienciaScalarWhereInput[]
  }

  export type AudienciaUncheckedUpdateManyWithoutImportacaoNestedInput = {
    create?: XOR<AudienciaCreateWithoutImportacaoInput, AudienciaUncheckedCreateWithoutImportacaoInput> | AudienciaCreateWithoutImportacaoInput[] | AudienciaUncheckedCreateWithoutImportacaoInput[]
    connectOrCreate?: AudienciaCreateOrConnectWithoutImportacaoInput | AudienciaCreateOrConnectWithoutImportacaoInput[]
    upsert?: AudienciaUpsertWithWhereUniqueWithoutImportacaoInput | AudienciaUpsertWithWhereUniqueWithoutImportacaoInput[]
    createMany?: AudienciaCreateManyImportacaoInputEnvelope
    set?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    disconnect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    delete?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    connect?: AudienciaWhereUniqueInput | AudienciaWhereUniqueInput[]
    update?: AudienciaUpdateWithWhereUniqueWithoutImportacaoInput | AudienciaUpdateWithWhereUniqueWithoutImportacaoInput[]
    updateMany?: AudienciaUpdateManyWithWhereWithoutImportacaoInput | AudienciaUpdateManyWithWhereWithoutImportacaoInput[]
    deleteMany?: AudienciaScalarWhereInput | AudienciaScalarWhereInput[]
  }

  export type TrtCreateNestedOneWithoutAudienciasInput = {
    create?: XOR<TrtCreateWithoutAudienciasInput, TrtUncheckedCreateWithoutAudienciasInput>
    connectOrCreate?: TrtCreateOrConnectWithoutAudienciasInput
    connect?: TrtWhereUniqueInput
  }

  export type PrepostoCreateNestedOneWithoutAudienciasInput = {
    create?: XOR<PrepostoCreateWithoutAudienciasInput, PrepostoUncheckedCreateWithoutAudienciasInput>
    connectOrCreate?: PrepostoCreateOrConnectWithoutAudienciasInput
    connect?: PrepostoWhereUniqueInput
  }

  export type ParceiroCreateNestedOneWithoutAudienciasInput = {
    create?: XOR<ParceiroCreateWithoutAudienciasInput, ParceiroUncheckedCreateWithoutAudienciasInput>
    connectOrCreate?: ParceiroCreateOrConnectWithoutAudienciasInput
    connect?: ParceiroWhereUniqueInput
  }

  export type ImportacaoCreateNestedOneWithoutAudienciasInput = {
    create?: XOR<ImportacaoCreateWithoutAudienciasInput, ImportacaoUncheckedCreateWithoutAudienciasInput>
    connectOrCreate?: ImportacaoCreateOrConnectWithoutAudienciasInput
    connect?: ImportacaoWhereUniqueInput
  }

  export type MensagemCreateNestedManyWithoutAudienciaInput = {
    create?: XOR<MensagemCreateWithoutAudienciaInput, MensagemUncheckedCreateWithoutAudienciaInput> | MensagemCreateWithoutAudienciaInput[] | MensagemUncheckedCreateWithoutAudienciaInput[]
    connectOrCreate?: MensagemCreateOrConnectWithoutAudienciaInput | MensagemCreateOrConnectWithoutAudienciaInput[]
    createMany?: MensagemCreateManyAudienciaInputEnvelope
    connect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
  }

  export type HistoricoStatusCreateNestedManyWithoutAudienciaInput = {
    create?: XOR<HistoricoStatusCreateWithoutAudienciaInput, HistoricoStatusUncheckedCreateWithoutAudienciaInput> | HistoricoStatusCreateWithoutAudienciaInput[] | HistoricoStatusUncheckedCreateWithoutAudienciaInput[]
    connectOrCreate?: HistoricoStatusCreateOrConnectWithoutAudienciaInput | HistoricoStatusCreateOrConnectWithoutAudienciaInput[]
    createMany?: HistoricoStatusCreateManyAudienciaInputEnvelope
    connect?: HistoricoStatusWhereUniqueInput | HistoricoStatusWhereUniqueInput[]
  }

  export type RelatorioAudienciaCreateNestedOneWithoutAudienciaInput = {
    create?: XOR<RelatorioAudienciaCreateWithoutAudienciaInput, RelatorioAudienciaUncheckedCreateWithoutAudienciaInput>
    connectOrCreate?: RelatorioAudienciaCreateOrConnectWithoutAudienciaInput
    connect?: RelatorioAudienciaWhereUniqueInput
  }

  export type SubstituicaoCreateNestedManyWithoutAudienciaInput = {
    create?: XOR<SubstituicaoCreateWithoutAudienciaInput, SubstituicaoUncheckedCreateWithoutAudienciaInput> | SubstituicaoCreateWithoutAudienciaInput[] | SubstituicaoUncheckedCreateWithoutAudienciaInput[]
    connectOrCreate?: SubstituicaoCreateOrConnectWithoutAudienciaInput | SubstituicaoCreateOrConnectWithoutAudienciaInput[]
    createMany?: SubstituicaoCreateManyAudienciaInputEnvelope
    connect?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
  }

  export type MensagemUncheckedCreateNestedManyWithoutAudienciaInput = {
    create?: XOR<MensagemCreateWithoutAudienciaInput, MensagemUncheckedCreateWithoutAudienciaInput> | MensagemCreateWithoutAudienciaInput[] | MensagemUncheckedCreateWithoutAudienciaInput[]
    connectOrCreate?: MensagemCreateOrConnectWithoutAudienciaInput | MensagemCreateOrConnectWithoutAudienciaInput[]
    createMany?: MensagemCreateManyAudienciaInputEnvelope
    connect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
  }

  export type HistoricoStatusUncheckedCreateNestedManyWithoutAudienciaInput = {
    create?: XOR<HistoricoStatusCreateWithoutAudienciaInput, HistoricoStatusUncheckedCreateWithoutAudienciaInput> | HistoricoStatusCreateWithoutAudienciaInput[] | HistoricoStatusUncheckedCreateWithoutAudienciaInput[]
    connectOrCreate?: HistoricoStatusCreateOrConnectWithoutAudienciaInput | HistoricoStatusCreateOrConnectWithoutAudienciaInput[]
    createMany?: HistoricoStatusCreateManyAudienciaInputEnvelope
    connect?: HistoricoStatusWhereUniqueInput | HistoricoStatusWhereUniqueInput[]
  }

  export type RelatorioAudienciaUncheckedCreateNestedOneWithoutAudienciaInput = {
    create?: XOR<RelatorioAudienciaCreateWithoutAudienciaInput, RelatorioAudienciaUncheckedCreateWithoutAudienciaInput>
    connectOrCreate?: RelatorioAudienciaCreateOrConnectWithoutAudienciaInput
    connect?: RelatorioAudienciaWhereUniqueInput
  }

  export type SubstituicaoUncheckedCreateNestedManyWithoutAudienciaInput = {
    create?: XOR<SubstituicaoCreateWithoutAudienciaInput, SubstituicaoUncheckedCreateWithoutAudienciaInput> | SubstituicaoCreateWithoutAudienciaInput[] | SubstituicaoUncheckedCreateWithoutAudienciaInput[]
    connectOrCreate?: SubstituicaoCreateOrConnectWithoutAudienciaInput | SubstituicaoCreateOrConnectWithoutAudienciaInput[]
    createMany?: SubstituicaoCreateManyAudienciaInputEnvelope
    connect?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
  }

  export type EnumModalidadeFieldUpdateOperationsInput = {
    set?: $Enums.Modalidade
  }

  export type EnumStatusAudienciaFieldUpdateOperationsInput = {
    set?: $Enums.StatusAudiencia
  }

  export type TrtUpdateOneRequiredWithoutAudienciasNestedInput = {
    create?: XOR<TrtCreateWithoutAudienciasInput, TrtUncheckedCreateWithoutAudienciasInput>
    connectOrCreate?: TrtCreateOrConnectWithoutAudienciasInput
    upsert?: TrtUpsertWithoutAudienciasInput
    connect?: TrtWhereUniqueInput
    update?: XOR<XOR<TrtUpdateToOneWithWhereWithoutAudienciasInput, TrtUpdateWithoutAudienciasInput>, TrtUncheckedUpdateWithoutAudienciasInput>
  }

  export type PrepostoUpdateOneRequiredWithoutAudienciasNestedInput = {
    create?: XOR<PrepostoCreateWithoutAudienciasInput, PrepostoUncheckedCreateWithoutAudienciasInput>
    connectOrCreate?: PrepostoCreateOrConnectWithoutAudienciasInput
    upsert?: PrepostoUpsertWithoutAudienciasInput
    connect?: PrepostoWhereUniqueInput
    update?: XOR<XOR<PrepostoUpdateToOneWithWhereWithoutAudienciasInput, PrepostoUpdateWithoutAudienciasInput>, PrepostoUncheckedUpdateWithoutAudienciasInput>
  }

  export type ParceiroUpdateOneRequiredWithoutAudienciasNestedInput = {
    create?: XOR<ParceiroCreateWithoutAudienciasInput, ParceiroUncheckedCreateWithoutAudienciasInput>
    connectOrCreate?: ParceiroCreateOrConnectWithoutAudienciasInput
    upsert?: ParceiroUpsertWithoutAudienciasInput
    connect?: ParceiroWhereUniqueInput
    update?: XOR<XOR<ParceiroUpdateToOneWithWhereWithoutAudienciasInput, ParceiroUpdateWithoutAudienciasInput>, ParceiroUncheckedUpdateWithoutAudienciasInput>
  }

  export type ImportacaoUpdateOneWithoutAudienciasNestedInput = {
    create?: XOR<ImportacaoCreateWithoutAudienciasInput, ImportacaoUncheckedCreateWithoutAudienciasInput>
    connectOrCreate?: ImportacaoCreateOrConnectWithoutAudienciasInput
    upsert?: ImportacaoUpsertWithoutAudienciasInput
    disconnect?: ImportacaoWhereInput | boolean
    delete?: ImportacaoWhereInput | boolean
    connect?: ImportacaoWhereUniqueInput
    update?: XOR<XOR<ImportacaoUpdateToOneWithWhereWithoutAudienciasInput, ImportacaoUpdateWithoutAudienciasInput>, ImportacaoUncheckedUpdateWithoutAudienciasInput>
  }

  export type MensagemUpdateManyWithoutAudienciaNestedInput = {
    create?: XOR<MensagemCreateWithoutAudienciaInput, MensagemUncheckedCreateWithoutAudienciaInput> | MensagemCreateWithoutAudienciaInput[] | MensagemUncheckedCreateWithoutAudienciaInput[]
    connectOrCreate?: MensagemCreateOrConnectWithoutAudienciaInput | MensagemCreateOrConnectWithoutAudienciaInput[]
    upsert?: MensagemUpsertWithWhereUniqueWithoutAudienciaInput | MensagemUpsertWithWhereUniqueWithoutAudienciaInput[]
    createMany?: MensagemCreateManyAudienciaInputEnvelope
    set?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    disconnect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    delete?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    connect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    update?: MensagemUpdateWithWhereUniqueWithoutAudienciaInput | MensagemUpdateWithWhereUniqueWithoutAudienciaInput[]
    updateMany?: MensagemUpdateManyWithWhereWithoutAudienciaInput | MensagemUpdateManyWithWhereWithoutAudienciaInput[]
    deleteMany?: MensagemScalarWhereInput | MensagemScalarWhereInput[]
  }

  export type HistoricoStatusUpdateManyWithoutAudienciaNestedInput = {
    create?: XOR<HistoricoStatusCreateWithoutAudienciaInput, HistoricoStatusUncheckedCreateWithoutAudienciaInput> | HistoricoStatusCreateWithoutAudienciaInput[] | HistoricoStatusUncheckedCreateWithoutAudienciaInput[]
    connectOrCreate?: HistoricoStatusCreateOrConnectWithoutAudienciaInput | HistoricoStatusCreateOrConnectWithoutAudienciaInput[]
    upsert?: HistoricoStatusUpsertWithWhereUniqueWithoutAudienciaInput | HistoricoStatusUpsertWithWhereUniqueWithoutAudienciaInput[]
    createMany?: HistoricoStatusCreateManyAudienciaInputEnvelope
    set?: HistoricoStatusWhereUniqueInput | HistoricoStatusWhereUniqueInput[]
    disconnect?: HistoricoStatusWhereUniqueInput | HistoricoStatusWhereUniqueInput[]
    delete?: HistoricoStatusWhereUniqueInput | HistoricoStatusWhereUniqueInput[]
    connect?: HistoricoStatusWhereUniqueInput | HistoricoStatusWhereUniqueInput[]
    update?: HistoricoStatusUpdateWithWhereUniqueWithoutAudienciaInput | HistoricoStatusUpdateWithWhereUniqueWithoutAudienciaInput[]
    updateMany?: HistoricoStatusUpdateManyWithWhereWithoutAudienciaInput | HistoricoStatusUpdateManyWithWhereWithoutAudienciaInput[]
    deleteMany?: HistoricoStatusScalarWhereInput | HistoricoStatusScalarWhereInput[]
  }

  export type RelatorioAudienciaUpdateOneWithoutAudienciaNestedInput = {
    create?: XOR<RelatorioAudienciaCreateWithoutAudienciaInput, RelatorioAudienciaUncheckedCreateWithoutAudienciaInput>
    connectOrCreate?: RelatorioAudienciaCreateOrConnectWithoutAudienciaInput
    upsert?: RelatorioAudienciaUpsertWithoutAudienciaInput
    disconnect?: RelatorioAudienciaWhereInput | boolean
    delete?: RelatorioAudienciaWhereInput | boolean
    connect?: RelatorioAudienciaWhereUniqueInput
    update?: XOR<XOR<RelatorioAudienciaUpdateToOneWithWhereWithoutAudienciaInput, RelatorioAudienciaUpdateWithoutAudienciaInput>, RelatorioAudienciaUncheckedUpdateWithoutAudienciaInput>
  }

  export type SubstituicaoUpdateManyWithoutAudienciaNestedInput = {
    create?: XOR<SubstituicaoCreateWithoutAudienciaInput, SubstituicaoUncheckedCreateWithoutAudienciaInput> | SubstituicaoCreateWithoutAudienciaInput[] | SubstituicaoUncheckedCreateWithoutAudienciaInput[]
    connectOrCreate?: SubstituicaoCreateOrConnectWithoutAudienciaInput | SubstituicaoCreateOrConnectWithoutAudienciaInput[]
    upsert?: SubstituicaoUpsertWithWhereUniqueWithoutAudienciaInput | SubstituicaoUpsertWithWhereUniqueWithoutAudienciaInput[]
    createMany?: SubstituicaoCreateManyAudienciaInputEnvelope
    set?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    disconnect?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    delete?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    connect?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    update?: SubstituicaoUpdateWithWhereUniqueWithoutAudienciaInput | SubstituicaoUpdateWithWhereUniqueWithoutAudienciaInput[]
    updateMany?: SubstituicaoUpdateManyWithWhereWithoutAudienciaInput | SubstituicaoUpdateManyWithWhereWithoutAudienciaInput[]
    deleteMany?: SubstituicaoScalarWhereInput | SubstituicaoScalarWhereInput[]
  }

  export type MensagemUncheckedUpdateManyWithoutAudienciaNestedInput = {
    create?: XOR<MensagemCreateWithoutAudienciaInput, MensagemUncheckedCreateWithoutAudienciaInput> | MensagemCreateWithoutAudienciaInput[] | MensagemUncheckedCreateWithoutAudienciaInput[]
    connectOrCreate?: MensagemCreateOrConnectWithoutAudienciaInput | MensagemCreateOrConnectWithoutAudienciaInput[]
    upsert?: MensagemUpsertWithWhereUniqueWithoutAudienciaInput | MensagemUpsertWithWhereUniqueWithoutAudienciaInput[]
    createMany?: MensagemCreateManyAudienciaInputEnvelope
    set?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    disconnect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    delete?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    connect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    update?: MensagemUpdateWithWhereUniqueWithoutAudienciaInput | MensagemUpdateWithWhereUniqueWithoutAudienciaInput[]
    updateMany?: MensagemUpdateManyWithWhereWithoutAudienciaInput | MensagemUpdateManyWithWhereWithoutAudienciaInput[]
    deleteMany?: MensagemScalarWhereInput | MensagemScalarWhereInput[]
  }

  export type HistoricoStatusUncheckedUpdateManyWithoutAudienciaNestedInput = {
    create?: XOR<HistoricoStatusCreateWithoutAudienciaInput, HistoricoStatusUncheckedCreateWithoutAudienciaInput> | HistoricoStatusCreateWithoutAudienciaInput[] | HistoricoStatusUncheckedCreateWithoutAudienciaInput[]
    connectOrCreate?: HistoricoStatusCreateOrConnectWithoutAudienciaInput | HistoricoStatusCreateOrConnectWithoutAudienciaInput[]
    upsert?: HistoricoStatusUpsertWithWhereUniqueWithoutAudienciaInput | HistoricoStatusUpsertWithWhereUniqueWithoutAudienciaInput[]
    createMany?: HistoricoStatusCreateManyAudienciaInputEnvelope
    set?: HistoricoStatusWhereUniqueInput | HistoricoStatusWhereUniqueInput[]
    disconnect?: HistoricoStatusWhereUniqueInput | HistoricoStatusWhereUniqueInput[]
    delete?: HistoricoStatusWhereUniqueInput | HistoricoStatusWhereUniqueInput[]
    connect?: HistoricoStatusWhereUniqueInput | HistoricoStatusWhereUniqueInput[]
    update?: HistoricoStatusUpdateWithWhereUniqueWithoutAudienciaInput | HistoricoStatusUpdateWithWhereUniqueWithoutAudienciaInput[]
    updateMany?: HistoricoStatusUpdateManyWithWhereWithoutAudienciaInput | HistoricoStatusUpdateManyWithWhereWithoutAudienciaInput[]
    deleteMany?: HistoricoStatusScalarWhereInput | HistoricoStatusScalarWhereInput[]
  }

  export type RelatorioAudienciaUncheckedUpdateOneWithoutAudienciaNestedInput = {
    create?: XOR<RelatorioAudienciaCreateWithoutAudienciaInput, RelatorioAudienciaUncheckedCreateWithoutAudienciaInput>
    connectOrCreate?: RelatorioAudienciaCreateOrConnectWithoutAudienciaInput
    upsert?: RelatorioAudienciaUpsertWithoutAudienciaInput
    disconnect?: RelatorioAudienciaWhereInput | boolean
    delete?: RelatorioAudienciaWhereInput | boolean
    connect?: RelatorioAudienciaWhereUniqueInput
    update?: XOR<XOR<RelatorioAudienciaUpdateToOneWithWhereWithoutAudienciaInput, RelatorioAudienciaUpdateWithoutAudienciaInput>, RelatorioAudienciaUncheckedUpdateWithoutAudienciaInput>
  }

  export type SubstituicaoUncheckedUpdateManyWithoutAudienciaNestedInput = {
    create?: XOR<SubstituicaoCreateWithoutAudienciaInput, SubstituicaoUncheckedCreateWithoutAudienciaInput> | SubstituicaoCreateWithoutAudienciaInput[] | SubstituicaoUncheckedCreateWithoutAudienciaInput[]
    connectOrCreate?: SubstituicaoCreateOrConnectWithoutAudienciaInput | SubstituicaoCreateOrConnectWithoutAudienciaInput[]
    upsert?: SubstituicaoUpsertWithWhereUniqueWithoutAudienciaInput | SubstituicaoUpsertWithWhereUniqueWithoutAudienciaInput[]
    createMany?: SubstituicaoCreateManyAudienciaInputEnvelope
    set?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    disconnect?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    delete?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    connect?: SubstituicaoWhereUniqueInput | SubstituicaoWhereUniqueInput[]
    update?: SubstituicaoUpdateWithWhereUniqueWithoutAudienciaInput | SubstituicaoUpdateWithWhereUniqueWithoutAudienciaInput[]
    updateMany?: SubstituicaoUpdateManyWithWhereWithoutAudienciaInput | SubstituicaoUpdateManyWithWhereWithoutAudienciaInput[]
    deleteMany?: SubstituicaoScalarWhereInput | SubstituicaoScalarWhereInput[]
  }

  export type AudienciaCreateNestedOneWithoutMensagensInput = {
    create?: XOR<AudienciaCreateWithoutMensagensInput, AudienciaUncheckedCreateWithoutMensagensInput>
    connectOrCreate?: AudienciaCreateOrConnectWithoutMensagensInput
    connect?: AudienciaWhereUniqueInput
  }

  export type PrepostoCreateNestedOneWithoutMensagensInput = {
    create?: XOR<PrepostoCreateWithoutMensagensInput, PrepostoUncheckedCreateWithoutMensagensInput>
    connectOrCreate?: PrepostoCreateOrConnectWithoutMensagensInput
    connect?: PrepostoWhereUniqueInput
  }

  export type ContatoParceiroCreateNestedOneWithoutMensagensInput = {
    create?: XOR<ContatoParceiroCreateWithoutMensagensInput, ContatoParceiroUncheckedCreateWithoutMensagensInput>
    connectOrCreate?: ContatoParceiroCreateOrConnectWithoutMensagensInput
    connect?: ContatoParceiroWhereUniqueInput
  }

  export type EnumTipoMensagemFieldUpdateOperationsInput = {
    set?: $Enums.TipoMensagem
  }

  export type EnumDirecaoMensagemFieldUpdateOperationsInput = {
    set?: $Enums.DirecaoMensagem
  }

  export type EnumStatusEnvioMensagemFieldUpdateOperationsInput = {
    set?: $Enums.StatusEnvioMensagem
  }

  export type AudienciaUpdateOneRequiredWithoutMensagensNestedInput = {
    create?: XOR<AudienciaCreateWithoutMensagensInput, AudienciaUncheckedCreateWithoutMensagensInput>
    connectOrCreate?: AudienciaCreateOrConnectWithoutMensagensInput
    upsert?: AudienciaUpsertWithoutMensagensInput
    connect?: AudienciaWhereUniqueInput
    update?: XOR<XOR<AudienciaUpdateToOneWithWhereWithoutMensagensInput, AudienciaUpdateWithoutMensagensInput>, AudienciaUncheckedUpdateWithoutMensagensInput>
  }

  export type PrepostoUpdateOneWithoutMensagensNestedInput = {
    create?: XOR<PrepostoCreateWithoutMensagensInput, PrepostoUncheckedCreateWithoutMensagensInput>
    connectOrCreate?: PrepostoCreateOrConnectWithoutMensagensInput
    upsert?: PrepostoUpsertWithoutMensagensInput
    disconnect?: PrepostoWhereInput | boolean
    delete?: PrepostoWhereInput | boolean
    connect?: PrepostoWhereUniqueInput
    update?: XOR<XOR<PrepostoUpdateToOneWithWhereWithoutMensagensInput, PrepostoUpdateWithoutMensagensInput>, PrepostoUncheckedUpdateWithoutMensagensInput>
  }

  export type ContatoParceiroUpdateOneWithoutMensagensNestedInput = {
    create?: XOR<ContatoParceiroCreateWithoutMensagensInput, ContatoParceiroUncheckedCreateWithoutMensagensInput>
    connectOrCreate?: ContatoParceiroCreateOrConnectWithoutMensagensInput
    upsert?: ContatoParceiroUpsertWithoutMensagensInput
    disconnect?: ContatoParceiroWhereInput | boolean
    delete?: ContatoParceiroWhereInput | boolean
    connect?: ContatoParceiroWhereUniqueInput
    update?: XOR<XOR<ContatoParceiroUpdateToOneWithWhereWithoutMensagensInput, ContatoParceiroUpdateWithoutMensagensInput>, ContatoParceiroUncheckedUpdateWithoutMensagensInput>
  }

  export type AudienciaCreateNestedOneWithoutRelatorioInput = {
    create?: XOR<AudienciaCreateWithoutRelatorioInput, AudienciaUncheckedCreateWithoutRelatorioInput>
    connectOrCreate?: AudienciaCreateOrConnectWithoutRelatorioInput
    connect?: AudienciaWhereUniqueInput
  }

  export type NullableEnumOcorrenciaAudienciaFieldUpdateOperationsInput = {
    set?: $Enums.OcorrenciaAudiencia | null
  }

  export type NullableEnumResultadoAudienciaFieldUpdateOperationsInput = {
    set?: $Enums.ResultadoAudiencia | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type AudienciaUpdateOneRequiredWithoutRelatorioNestedInput = {
    create?: XOR<AudienciaCreateWithoutRelatorioInput, AudienciaUncheckedCreateWithoutRelatorioInput>
    connectOrCreate?: AudienciaCreateOrConnectWithoutRelatorioInput
    upsert?: AudienciaUpsertWithoutRelatorioInput
    connect?: AudienciaWhereUniqueInput
    update?: XOR<XOR<AudienciaUpdateToOneWithWhereWithoutRelatorioInput, AudienciaUpdateWithoutRelatorioInput>, AudienciaUncheckedUpdateWithoutRelatorioInput>
  }

  export type AudienciaCreateNestedOneWithoutHistoricoStatusInput = {
    create?: XOR<AudienciaCreateWithoutHistoricoStatusInput, AudienciaUncheckedCreateWithoutHistoricoStatusInput>
    connectOrCreate?: AudienciaCreateOrConnectWithoutHistoricoStatusInput
    connect?: AudienciaWhereUniqueInput
  }

  export type AudienciaUpdateOneRequiredWithoutHistoricoStatusNestedInput = {
    create?: XOR<AudienciaCreateWithoutHistoricoStatusInput, AudienciaUncheckedCreateWithoutHistoricoStatusInput>
    connectOrCreate?: AudienciaCreateOrConnectWithoutHistoricoStatusInput
    upsert?: AudienciaUpsertWithoutHistoricoStatusInput
    connect?: AudienciaWhereUniqueInput
    update?: XOR<XOR<AudienciaUpdateToOneWithWhereWithoutHistoricoStatusInput, AudienciaUpdateWithoutHistoricoStatusInput>, AudienciaUncheckedUpdateWithoutHistoricoStatusInput>
  }

  export type AudienciaCreateNestedOneWithoutSubstituicoesInput = {
    create?: XOR<AudienciaCreateWithoutSubstituicoesInput, AudienciaUncheckedCreateWithoutSubstituicoesInput>
    connectOrCreate?: AudienciaCreateOrConnectWithoutSubstituicoesInput
    connect?: AudienciaWhereUniqueInput
  }

  export type PrepostoCreateNestedOneWithoutSubstituicoesAnteriorInput = {
    create?: XOR<PrepostoCreateWithoutSubstituicoesAnteriorInput, PrepostoUncheckedCreateWithoutSubstituicoesAnteriorInput>
    connectOrCreate?: PrepostoCreateOrConnectWithoutSubstituicoesAnteriorInput
    connect?: PrepostoWhereUniqueInput
  }

  export type PrepostoCreateNestedOneWithoutSubstituicoesNovoInput = {
    create?: XOR<PrepostoCreateWithoutSubstituicoesNovoInput, PrepostoUncheckedCreateWithoutSubstituicoesNovoInput>
    connectOrCreate?: PrepostoCreateOrConnectWithoutSubstituicoesNovoInput
    connect?: PrepostoWhereUniqueInput
  }

  export type EnumStatusSubstituicaoFieldUpdateOperationsInput = {
    set?: $Enums.StatusSubstituicao
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AudienciaUpdateOneRequiredWithoutSubstituicoesNestedInput = {
    create?: XOR<AudienciaCreateWithoutSubstituicoesInput, AudienciaUncheckedCreateWithoutSubstituicoesInput>
    connectOrCreate?: AudienciaCreateOrConnectWithoutSubstituicoesInput
    upsert?: AudienciaUpsertWithoutSubstituicoesInput
    connect?: AudienciaWhereUniqueInput
    update?: XOR<XOR<AudienciaUpdateToOneWithWhereWithoutSubstituicoesInput, AudienciaUpdateWithoutSubstituicoesInput>, AudienciaUncheckedUpdateWithoutSubstituicoesInput>
  }

  export type PrepostoUpdateOneRequiredWithoutSubstituicoesAnteriorNestedInput = {
    create?: XOR<PrepostoCreateWithoutSubstituicoesAnteriorInput, PrepostoUncheckedCreateWithoutSubstituicoesAnteriorInput>
    connectOrCreate?: PrepostoCreateOrConnectWithoutSubstituicoesAnteriorInput
    upsert?: PrepostoUpsertWithoutSubstituicoesAnteriorInput
    connect?: PrepostoWhereUniqueInput
    update?: XOR<XOR<PrepostoUpdateToOneWithWhereWithoutSubstituicoesAnteriorInput, PrepostoUpdateWithoutSubstituicoesAnteriorInput>, PrepostoUncheckedUpdateWithoutSubstituicoesAnteriorInput>
  }

  export type PrepostoUpdateOneWithoutSubstituicoesNovoNestedInput = {
    create?: XOR<PrepostoCreateWithoutSubstituicoesNovoInput, PrepostoUncheckedCreateWithoutSubstituicoesNovoInput>
    connectOrCreate?: PrepostoCreateOrConnectWithoutSubstituicoesNovoInput
    upsert?: PrepostoUpsertWithoutSubstituicoesNovoInput
    disconnect?: PrepostoWhereInput | boolean
    delete?: PrepostoWhereInput | boolean
    connect?: PrepostoWhereUniqueInput
    update?: XOR<XOR<PrepostoUpdateToOneWithWhereWithoutSubstituicoesNovoInput, PrepostoUpdateWithoutSubstituicoesNovoInput>, PrepostoUncheckedUpdateWithoutSubstituicoesNovoInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleUsuarioFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleUsuario | EnumRoleUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.RoleUsuario[] | ListEnumRoleUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoleUsuario[] | ListEnumRoleUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleUsuarioFilter<$PrismaModel> | $Enums.RoleUsuario
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleUsuarioWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleUsuario | EnumRoleUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.RoleUsuario[] | ListEnumRoleUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoleUsuario[] | ListEnumRoleUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleUsuarioWithAggregatesFilter<$PrismaModel> | $Enums.RoleUsuario
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleUsuarioFilter<$PrismaModel>
    _max?: NestedEnumRoleUsuarioFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumStatusImportacaoFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusImportacao | EnumStatusImportacaoFieldRefInput<$PrismaModel>
    in?: $Enums.StatusImportacao[] | ListEnumStatusImportacaoFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusImportacao[] | ListEnumStatusImportacaoFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusImportacaoFilter<$PrismaModel> | $Enums.StatusImportacao
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumStatusImportacaoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusImportacao | EnumStatusImportacaoFieldRefInput<$PrismaModel>
    in?: $Enums.StatusImportacao[] | ListEnumStatusImportacaoFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusImportacao[] | ListEnumStatusImportacaoFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusImportacaoWithAggregatesFilter<$PrismaModel> | $Enums.StatusImportacao
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusImportacaoFilter<$PrismaModel>
    _max?: NestedEnumStatusImportacaoFilter<$PrismaModel>
  }

  export type NestedEnumModalidadeFilter<$PrismaModel = never> = {
    equals?: $Enums.Modalidade | EnumModalidadeFieldRefInput<$PrismaModel>
    in?: $Enums.Modalidade[] | ListEnumModalidadeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Modalidade[] | ListEnumModalidadeFieldRefInput<$PrismaModel>
    not?: NestedEnumModalidadeFilter<$PrismaModel> | $Enums.Modalidade
  }

  export type NestedEnumStatusAudienciaFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusAudiencia | EnumStatusAudienciaFieldRefInput<$PrismaModel>
    in?: $Enums.StatusAudiencia[] | ListEnumStatusAudienciaFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusAudiencia[] | ListEnumStatusAudienciaFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusAudienciaFilter<$PrismaModel> | $Enums.StatusAudiencia
  }

  export type NestedEnumModalidadeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Modalidade | EnumModalidadeFieldRefInput<$PrismaModel>
    in?: $Enums.Modalidade[] | ListEnumModalidadeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Modalidade[] | ListEnumModalidadeFieldRefInput<$PrismaModel>
    not?: NestedEnumModalidadeWithAggregatesFilter<$PrismaModel> | $Enums.Modalidade
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumModalidadeFilter<$PrismaModel>
    _max?: NestedEnumModalidadeFilter<$PrismaModel>
  }

  export type NestedEnumStatusAudienciaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusAudiencia | EnumStatusAudienciaFieldRefInput<$PrismaModel>
    in?: $Enums.StatusAudiencia[] | ListEnumStatusAudienciaFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusAudiencia[] | ListEnumStatusAudienciaFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusAudienciaWithAggregatesFilter<$PrismaModel> | $Enums.StatusAudiencia
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusAudienciaFilter<$PrismaModel>
    _max?: NestedEnumStatusAudienciaFilter<$PrismaModel>
  }

  export type NestedEnumTipoMensagemFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoMensagem | EnumTipoMensagemFieldRefInput<$PrismaModel>
    in?: $Enums.TipoMensagem[] | ListEnumTipoMensagemFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoMensagem[] | ListEnumTipoMensagemFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoMensagemFilter<$PrismaModel> | $Enums.TipoMensagem
  }

  export type NestedEnumDirecaoMensagemFilter<$PrismaModel = never> = {
    equals?: $Enums.DirecaoMensagem | EnumDirecaoMensagemFieldRefInput<$PrismaModel>
    in?: $Enums.DirecaoMensagem[] | ListEnumDirecaoMensagemFieldRefInput<$PrismaModel>
    notIn?: $Enums.DirecaoMensagem[] | ListEnumDirecaoMensagemFieldRefInput<$PrismaModel>
    not?: NestedEnumDirecaoMensagemFilter<$PrismaModel> | $Enums.DirecaoMensagem
  }

  export type NestedEnumStatusEnvioMensagemFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusEnvioMensagem | EnumStatusEnvioMensagemFieldRefInput<$PrismaModel>
    in?: $Enums.StatusEnvioMensagem[] | ListEnumStatusEnvioMensagemFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusEnvioMensagem[] | ListEnumStatusEnvioMensagemFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusEnvioMensagemFilter<$PrismaModel> | $Enums.StatusEnvioMensagem
  }

  export type NestedEnumTipoMensagemWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoMensagem | EnumTipoMensagemFieldRefInput<$PrismaModel>
    in?: $Enums.TipoMensagem[] | ListEnumTipoMensagemFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoMensagem[] | ListEnumTipoMensagemFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoMensagemWithAggregatesFilter<$PrismaModel> | $Enums.TipoMensagem
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoMensagemFilter<$PrismaModel>
    _max?: NestedEnumTipoMensagemFilter<$PrismaModel>
  }

  export type NestedEnumDirecaoMensagemWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DirecaoMensagem | EnumDirecaoMensagemFieldRefInput<$PrismaModel>
    in?: $Enums.DirecaoMensagem[] | ListEnumDirecaoMensagemFieldRefInput<$PrismaModel>
    notIn?: $Enums.DirecaoMensagem[] | ListEnumDirecaoMensagemFieldRefInput<$PrismaModel>
    not?: NestedEnumDirecaoMensagemWithAggregatesFilter<$PrismaModel> | $Enums.DirecaoMensagem
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDirecaoMensagemFilter<$PrismaModel>
    _max?: NestedEnumDirecaoMensagemFilter<$PrismaModel>
  }

  export type NestedEnumStatusEnvioMensagemWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusEnvioMensagem | EnumStatusEnvioMensagemFieldRefInput<$PrismaModel>
    in?: $Enums.StatusEnvioMensagem[] | ListEnumStatusEnvioMensagemFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusEnvioMensagem[] | ListEnumStatusEnvioMensagemFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusEnvioMensagemWithAggregatesFilter<$PrismaModel> | $Enums.StatusEnvioMensagem
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusEnvioMensagemFilter<$PrismaModel>
    _max?: NestedEnumStatusEnvioMensagemFilter<$PrismaModel>
  }

  export type NestedEnumOcorrenciaAudienciaNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.OcorrenciaAudiencia | EnumOcorrenciaAudienciaFieldRefInput<$PrismaModel> | null
    in?: $Enums.OcorrenciaAudiencia[] | ListEnumOcorrenciaAudienciaFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.OcorrenciaAudiencia[] | ListEnumOcorrenciaAudienciaFieldRefInput<$PrismaModel> | null
    not?: NestedEnumOcorrenciaAudienciaNullableFilter<$PrismaModel> | $Enums.OcorrenciaAudiencia | null
  }

  export type NestedEnumResultadoAudienciaNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ResultadoAudiencia | EnumResultadoAudienciaFieldRefInput<$PrismaModel> | null
    in?: $Enums.ResultadoAudiencia[] | ListEnumResultadoAudienciaFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ResultadoAudiencia[] | ListEnumResultadoAudienciaFieldRefInput<$PrismaModel> | null
    not?: NestedEnumResultadoAudienciaNullableFilter<$PrismaModel> | $Enums.ResultadoAudiencia | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedEnumOcorrenciaAudienciaNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OcorrenciaAudiencia | EnumOcorrenciaAudienciaFieldRefInput<$PrismaModel> | null
    in?: $Enums.OcorrenciaAudiencia[] | ListEnumOcorrenciaAudienciaFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.OcorrenciaAudiencia[] | ListEnumOcorrenciaAudienciaFieldRefInput<$PrismaModel> | null
    not?: NestedEnumOcorrenciaAudienciaNullableWithAggregatesFilter<$PrismaModel> | $Enums.OcorrenciaAudiencia | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumOcorrenciaAudienciaNullableFilter<$PrismaModel>
    _max?: NestedEnumOcorrenciaAudienciaNullableFilter<$PrismaModel>
  }

  export type NestedEnumResultadoAudienciaNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ResultadoAudiencia | EnumResultadoAudienciaFieldRefInput<$PrismaModel> | null
    in?: $Enums.ResultadoAudiencia[] | ListEnumResultadoAudienciaFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ResultadoAudiencia[] | ListEnumResultadoAudienciaFieldRefInput<$PrismaModel> | null
    not?: NestedEnumResultadoAudienciaNullableWithAggregatesFilter<$PrismaModel> | $Enums.ResultadoAudiencia | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumResultadoAudienciaNullableFilter<$PrismaModel>
    _max?: NestedEnumResultadoAudienciaNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedEnumStatusSubstituicaoFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusSubstituicao | EnumStatusSubstituicaoFieldRefInput<$PrismaModel>
    in?: $Enums.StatusSubstituicao[] | ListEnumStatusSubstituicaoFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusSubstituicao[] | ListEnumStatusSubstituicaoFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusSubstituicaoFilter<$PrismaModel> | $Enums.StatusSubstituicao
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumStatusSubstituicaoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusSubstituicao | EnumStatusSubstituicaoFieldRefInput<$PrismaModel>
    in?: $Enums.StatusSubstituicao[] | ListEnumStatusSubstituicaoFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusSubstituicao[] | ListEnumStatusSubstituicaoFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusSubstituicaoWithAggregatesFilter<$PrismaModel> | $Enums.StatusSubstituicao
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusSubstituicaoFilter<$PrismaModel>
    _max?: NestedEnumStatusSubstituicaoFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AudienciaCreateWithoutTrtInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    vara?: string | null
    status?: $Enums.StatusAudiencia
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    preposto: PrepostoCreateNestedOneWithoutAudienciasInput
    parceiro: ParceiroCreateNestedOneWithoutAudienciasInput
    importacao?: ImportacaoCreateNestedOneWithoutAudienciasInput
    mensagens?: MensagemCreateNestedManyWithoutAudienciaInput
    historicoStatus?: HistoricoStatusCreateNestedManyWithoutAudienciaInput
    relatorio?: RelatorioAudienciaCreateNestedOneWithoutAudienciaInput
    substituicoes?: SubstituicaoCreateNestedManyWithoutAudienciaInput
  }

  export type AudienciaUncheckedCreateWithoutTrtInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    vara?: string | null
    status?: $Enums.StatusAudiencia
    prepostoId: string
    parceiroId: string
    importacaoId?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mensagens?: MensagemUncheckedCreateNestedManyWithoutAudienciaInput
    historicoStatus?: HistoricoStatusUncheckedCreateNestedManyWithoutAudienciaInput
    relatorio?: RelatorioAudienciaUncheckedCreateNestedOneWithoutAudienciaInput
    substituicoes?: SubstituicaoUncheckedCreateNestedManyWithoutAudienciaInput
  }

  export type AudienciaCreateOrConnectWithoutTrtInput = {
    where: AudienciaWhereUniqueInput
    create: XOR<AudienciaCreateWithoutTrtInput, AudienciaUncheckedCreateWithoutTrtInput>
  }

  export type AudienciaCreateManyTrtInputEnvelope = {
    data: AudienciaCreateManyTrtInput | AudienciaCreateManyTrtInput[]
    skipDuplicates?: boolean
  }

  export type AudienciaUpsertWithWhereUniqueWithoutTrtInput = {
    where: AudienciaWhereUniqueInput
    update: XOR<AudienciaUpdateWithoutTrtInput, AudienciaUncheckedUpdateWithoutTrtInput>
    create: XOR<AudienciaCreateWithoutTrtInput, AudienciaUncheckedCreateWithoutTrtInput>
  }

  export type AudienciaUpdateWithWhereUniqueWithoutTrtInput = {
    where: AudienciaWhereUniqueInput
    data: XOR<AudienciaUpdateWithoutTrtInput, AudienciaUncheckedUpdateWithoutTrtInput>
  }

  export type AudienciaUpdateManyWithWhereWithoutTrtInput = {
    where: AudienciaScalarWhereInput
    data: XOR<AudienciaUpdateManyMutationInput, AudienciaUncheckedUpdateManyWithoutTrtInput>
  }

  export type AudienciaScalarWhereInput = {
    AND?: AudienciaScalarWhereInput | AudienciaScalarWhereInput[]
    OR?: AudienciaScalarWhereInput[]
    NOT?: AudienciaScalarWhereInput | AudienciaScalarWhereInput[]
    id?: StringFilter<"Audiencia"> | string
    numeroProcesso?: StringFilter<"Audiencia"> | string
    reclamante?: StringNullableFilter<"Audiencia"> | string | null
    data?: DateTimeFilter<"Audiencia"> | Date | string
    hora?: StringFilter<"Audiencia"> | string
    modalidade?: EnumModalidadeFilter<"Audiencia"> | $Enums.Modalidade
    local?: StringNullableFilter<"Audiencia"> | string | null
    link?: StringNullableFilter<"Audiencia"> | string | null
    trtId?: StringFilter<"Audiencia"> | string
    vara?: StringNullableFilter<"Audiencia"> | string | null
    status?: EnumStatusAudienciaFilter<"Audiencia"> | $Enums.StatusAudiencia
    prepostoId?: StringFilter<"Audiencia"> | string
    parceiroId?: StringFilter<"Audiencia"> | string
    importacaoId?: StringNullableFilter<"Audiencia"> | string | null
    observacoes?: StringNullableFilter<"Audiencia"> | string | null
    createdAt?: DateTimeFilter<"Audiencia"> | Date | string
    updatedAt?: DateTimeFilter<"Audiencia"> | Date | string
  }

  export type AudienciaCreateWithoutPrepostoInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    vara?: string | null
    status?: $Enums.StatusAudiencia
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trt: TrtCreateNestedOneWithoutAudienciasInput
    parceiro: ParceiroCreateNestedOneWithoutAudienciasInput
    importacao?: ImportacaoCreateNestedOneWithoutAudienciasInput
    mensagens?: MensagemCreateNestedManyWithoutAudienciaInput
    historicoStatus?: HistoricoStatusCreateNestedManyWithoutAudienciaInput
    relatorio?: RelatorioAudienciaCreateNestedOneWithoutAudienciaInput
    substituicoes?: SubstituicaoCreateNestedManyWithoutAudienciaInput
  }

  export type AudienciaUncheckedCreateWithoutPrepostoInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    trtId: string
    vara?: string | null
    status?: $Enums.StatusAudiencia
    parceiroId: string
    importacaoId?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mensagens?: MensagemUncheckedCreateNestedManyWithoutAudienciaInput
    historicoStatus?: HistoricoStatusUncheckedCreateNestedManyWithoutAudienciaInput
    relatorio?: RelatorioAudienciaUncheckedCreateNestedOneWithoutAudienciaInput
    substituicoes?: SubstituicaoUncheckedCreateNestedManyWithoutAudienciaInput
  }

  export type AudienciaCreateOrConnectWithoutPrepostoInput = {
    where: AudienciaWhereUniqueInput
    create: XOR<AudienciaCreateWithoutPrepostoInput, AudienciaUncheckedCreateWithoutPrepostoInput>
  }

  export type AudienciaCreateManyPrepostoInputEnvelope = {
    data: AudienciaCreateManyPrepostoInput | AudienciaCreateManyPrepostoInput[]
    skipDuplicates?: boolean
  }

  export type MensagemCreateWithoutPrepostoInput = {
    id?: string
    tipo: $Enums.TipoMensagem
    direcao: $Enums.DirecaoMensagem
    conteudo: string
    respostaBotao?: string | null
    observacao?: string | null
    whatsappMessageId?: string | null
    statusEnvio?: $Enums.StatusEnvioMensagem
    createdAt?: Date | string
    audiencia: AudienciaCreateNestedOneWithoutMensagensInput
    contatoParceiro?: ContatoParceiroCreateNestedOneWithoutMensagensInput
  }

  export type MensagemUncheckedCreateWithoutPrepostoInput = {
    id?: string
    audienciaId: string
    contatoParceiroId?: string | null
    tipo: $Enums.TipoMensagem
    direcao: $Enums.DirecaoMensagem
    conteudo: string
    respostaBotao?: string | null
    observacao?: string | null
    whatsappMessageId?: string | null
    statusEnvio?: $Enums.StatusEnvioMensagem
    createdAt?: Date | string
  }

  export type MensagemCreateOrConnectWithoutPrepostoInput = {
    where: MensagemWhereUniqueInput
    create: XOR<MensagemCreateWithoutPrepostoInput, MensagemUncheckedCreateWithoutPrepostoInput>
  }

  export type MensagemCreateManyPrepostoInputEnvelope = {
    data: MensagemCreateManyPrepostoInput | MensagemCreateManyPrepostoInput[]
    skipDuplicates?: boolean
  }

  export type SubstituicaoCreateWithoutPrepostoAnteriorInput = {
    id?: string
    motivo: string
    status?: $Enums.StatusSubstituicao
    createdAt?: Date | string
    resolvidoEm?: Date | string | null
    audiencia: AudienciaCreateNestedOneWithoutSubstituicoesInput
    prepostoNovo?: PrepostoCreateNestedOneWithoutSubstituicoesNovoInput
  }

  export type SubstituicaoUncheckedCreateWithoutPrepostoAnteriorInput = {
    id?: string
    audienciaId: string
    prepostoNovoId?: string | null
    motivo: string
    status?: $Enums.StatusSubstituicao
    createdAt?: Date | string
    resolvidoEm?: Date | string | null
  }

  export type SubstituicaoCreateOrConnectWithoutPrepostoAnteriorInput = {
    where: SubstituicaoWhereUniqueInput
    create: XOR<SubstituicaoCreateWithoutPrepostoAnteriorInput, SubstituicaoUncheckedCreateWithoutPrepostoAnteriorInput>
  }

  export type SubstituicaoCreateManyPrepostoAnteriorInputEnvelope = {
    data: SubstituicaoCreateManyPrepostoAnteriorInput | SubstituicaoCreateManyPrepostoAnteriorInput[]
    skipDuplicates?: boolean
  }

  export type SubstituicaoCreateWithoutPrepostoNovoInput = {
    id?: string
    motivo: string
    status?: $Enums.StatusSubstituicao
    createdAt?: Date | string
    resolvidoEm?: Date | string | null
    audiencia: AudienciaCreateNestedOneWithoutSubstituicoesInput
    prepostoAnterior: PrepostoCreateNestedOneWithoutSubstituicoesAnteriorInput
  }

  export type SubstituicaoUncheckedCreateWithoutPrepostoNovoInput = {
    id?: string
    audienciaId: string
    prepostoAnteriorId: string
    motivo: string
    status?: $Enums.StatusSubstituicao
    createdAt?: Date | string
    resolvidoEm?: Date | string | null
  }

  export type SubstituicaoCreateOrConnectWithoutPrepostoNovoInput = {
    where: SubstituicaoWhereUniqueInput
    create: XOR<SubstituicaoCreateWithoutPrepostoNovoInput, SubstituicaoUncheckedCreateWithoutPrepostoNovoInput>
  }

  export type SubstituicaoCreateManyPrepostoNovoInputEnvelope = {
    data: SubstituicaoCreateManyPrepostoNovoInput | SubstituicaoCreateManyPrepostoNovoInput[]
    skipDuplicates?: boolean
  }

  export type AudienciaUpsertWithWhereUniqueWithoutPrepostoInput = {
    where: AudienciaWhereUniqueInput
    update: XOR<AudienciaUpdateWithoutPrepostoInput, AudienciaUncheckedUpdateWithoutPrepostoInput>
    create: XOR<AudienciaCreateWithoutPrepostoInput, AudienciaUncheckedCreateWithoutPrepostoInput>
  }

  export type AudienciaUpdateWithWhereUniqueWithoutPrepostoInput = {
    where: AudienciaWhereUniqueInput
    data: XOR<AudienciaUpdateWithoutPrepostoInput, AudienciaUncheckedUpdateWithoutPrepostoInput>
  }

  export type AudienciaUpdateManyWithWhereWithoutPrepostoInput = {
    where: AudienciaScalarWhereInput
    data: XOR<AudienciaUpdateManyMutationInput, AudienciaUncheckedUpdateManyWithoutPrepostoInput>
  }

  export type MensagemUpsertWithWhereUniqueWithoutPrepostoInput = {
    where: MensagemWhereUniqueInput
    update: XOR<MensagemUpdateWithoutPrepostoInput, MensagemUncheckedUpdateWithoutPrepostoInput>
    create: XOR<MensagemCreateWithoutPrepostoInput, MensagemUncheckedCreateWithoutPrepostoInput>
  }

  export type MensagemUpdateWithWhereUniqueWithoutPrepostoInput = {
    where: MensagemWhereUniqueInput
    data: XOR<MensagemUpdateWithoutPrepostoInput, MensagemUncheckedUpdateWithoutPrepostoInput>
  }

  export type MensagemUpdateManyWithWhereWithoutPrepostoInput = {
    where: MensagemScalarWhereInput
    data: XOR<MensagemUpdateManyMutationInput, MensagemUncheckedUpdateManyWithoutPrepostoInput>
  }

  export type MensagemScalarWhereInput = {
    AND?: MensagemScalarWhereInput | MensagemScalarWhereInput[]
    OR?: MensagemScalarWhereInput[]
    NOT?: MensagemScalarWhereInput | MensagemScalarWhereInput[]
    id?: StringFilter<"Mensagem"> | string
    audienciaId?: StringFilter<"Mensagem"> | string
    prepostoId?: StringNullableFilter<"Mensagem"> | string | null
    contatoParceiroId?: StringNullableFilter<"Mensagem"> | string | null
    tipo?: EnumTipoMensagemFilter<"Mensagem"> | $Enums.TipoMensagem
    direcao?: EnumDirecaoMensagemFilter<"Mensagem"> | $Enums.DirecaoMensagem
    conteudo?: StringFilter<"Mensagem"> | string
    respostaBotao?: StringNullableFilter<"Mensagem"> | string | null
    observacao?: StringNullableFilter<"Mensagem"> | string | null
    whatsappMessageId?: StringNullableFilter<"Mensagem"> | string | null
    statusEnvio?: EnumStatusEnvioMensagemFilter<"Mensagem"> | $Enums.StatusEnvioMensagem
    createdAt?: DateTimeFilter<"Mensagem"> | Date | string
  }

  export type SubstituicaoUpsertWithWhereUniqueWithoutPrepostoAnteriorInput = {
    where: SubstituicaoWhereUniqueInput
    update: XOR<SubstituicaoUpdateWithoutPrepostoAnteriorInput, SubstituicaoUncheckedUpdateWithoutPrepostoAnteriorInput>
    create: XOR<SubstituicaoCreateWithoutPrepostoAnteriorInput, SubstituicaoUncheckedCreateWithoutPrepostoAnteriorInput>
  }

  export type SubstituicaoUpdateWithWhereUniqueWithoutPrepostoAnteriorInput = {
    where: SubstituicaoWhereUniqueInput
    data: XOR<SubstituicaoUpdateWithoutPrepostoAnteriorInput, SubstituicaoUncheckedUpdateWithoutPrepostoAnteriorInput>
  }

  export type SubstituicaoUpdateManyWithWhereWithoutPrepostoAnteriorInput = {
    where: SubstituicaoScalarWhereInput
    data: XOR<SubstituicaoUpdateManyMutationInput, SubstituicaoUncheckedUpdateManyWithoutPrepostoAnteriorInput>
  }

  export type SubstituicaoScalarWhereInput = {
    AND?: SubstituicaoScalarWhereInput | SubstituicaoScalarWhereInput[]
    OR?: SubstituicaoScalarWhereInput[]
    NOT?: SubstituicaoScalarWhereInput | SubstituicaoScalarWhereInput[]
    id?: StringFilter<"Substituicao"> | string
    audienciaId?: StringFilter<"Substituicao"> | string
    prepostoAnteriorId?: StringFilter<"Substituicao"> | string
    prepostoNovoId?: StringNullableFilter<"Substituicao"> | string | null
    motivo?: StringFilter<"Substituicao"> | string
    status?: EnumStatusSubstituicaoFilter<"Substituicao"> | $Enums.StatusSubstituicao
    createdAt?: DateTimeFilter<"Substituicao"> | Date | string
    resolvidoEm?: DateTimeNullableFilter<"Substituicao"> | Date | string | null
  }

  export type SubstituicaoUpsertWithWhereUniqueWithoutPrepostoNovoInput = {
    where: SubstituicaoWhereUniqueInput
    update: XOR<SubstituicaoUpdateWithoutPrepostoNovoInput, SubstituicaoUncheckedUpdateWithoutPrepostoNovoInput>
    create: XOR<SubstituicaoCreateWithoutPrepostoNovoInput, SubstituicaoUncheckedCreateWithoutPrepostoNovoInput>
  }

  export type SubstituicaoUpdateWithWhereUniqueWithoutPrepostoNovoInput = {
    where: SubstituicaoWhereUniqueInput
    data: XOR<SubstituicaoUpdateWithoutPrepostoNovoInput, SubstituicaoUncheckedUpdateWithoutPrepostoNovoInput>
  }

  export type SubstituicaoUpdateManyWithWhereWithoutPrepostoNovoInput = {
    where: SubstituicaoScalarWhereInput
    data: XOR<SubstituicaoUpdateManyMutationInput, SubstituicaoUncheckedUpdateManyWithoutPrepostoNovoInput>
  }

  export type ContatoParceiroCreateWithoutParceiroInput = {
    id?: string
    nome: string
    telefoneWhatsapp: string
    email?: string | null
    cargo?: string | null
    ordemEscalonamento?: number
    createdAt?: Date | string
    mensagens?: MensagemCreateNestedManyWithoutContatoParceiroInput
  }

  export type ContatoParceiroUncheckedCreateWithoutParceiroInput = {
    id?: string
    nome: string
    telefoneWhatsapp: string
    email?: string | null
    cargo?: string | null
    ordemEscalonamento?: number
    createdAt?: Date | string
    mensagens?: MensagemUncheckedCreateNestedManyWithoutContatoParceiroInput
  }

  export type ContatoParceiroCreateOrConnectWithoutParceiroInput = {
    where: ContatoParceiroWhereUniqueInput
    create: XOR<ContatoParceiroCreateWithoutParceiroInput, ContatoParceiroUncheckedCreateWithoutParceiroInput>
  }

  export type ContatoParceiroCreateManyParceiroInputEnvelope = {
    data: ContatoParceiroCreateManyParceiroInput | ContatoParceiroCreateManyParceiroInput[]
    skipDuplicates?: boolean
  }

  export type AudienciaCreateWithoutParceiroInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    vara?: string | null
    status?: $Enums.StatusAudiencia
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trt: TrtCreateNestedOneWithoutAudienciasInput
    preposto: PrepostoCreateNestedOneWithoutAudienciasInput
    importacao?: ImportacaoCreateNestedOneWithoutAudienciasInput
    mensagens?: MensagemCreateNestedManyWithoutAudienciaInput
    historicoStatus?: HistoricoStatusCreateNestedManyWithoutAudienciaInput
    relatorio?: RelatorioAudienciaCreateNestedOneWithoutAudienciaInput
    substituicoes?: SubstituicaoCreateNestedManyWithoutAudienciaInput
  }

  export type AudienciaUncheckedCreateWithoutParceiroInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    trtId: string
    vara?: string | null
    status?: $Enums.StatusAudiencia
    prepostoId: string
    importacaoId?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mensagens?: MensagemUncheckedCreateNestedManyWithoutAudienciaInput
    historicoStatus?: HistoricoStatusUncheckedCreateNestedManyWithoutAudienciaInput
    relatorio?: RelatorioAudienciaUncheckedCreateNestedOneWithoutAudienciaInput
    substituicoes?: SubstituicaoUncheckedCreateNestedManyWithoutAudienciaInput
  }

  export type AudienciaCreateOrConnectWithoutParceiroInput = {
    where: AudienciaWhereUniqueInput
    create: XOR<AudienciaCreateWithoutParceiroInput, AudienciaUncheckedCreateWithoutParceiroInput>
  }

  export type AudienciaCreateManyParceiroInputEnvelope = {
    data: AudienciaCreateManyParceiroInput | AudienciaCreateManyParceiroInput[]
    skipDuplicates?: boolean
  }

  export type ContatoParceiroUpsertWithWhereUniqueWithoutParceiroInput = {
    where: ContatoParceiroWhereUniqueInput
    update: XOR<ContatoParceiroUpdateWithoutParceiroInput, ContatoParceiroUncheckedUpdateWithoutParceiroInput>
    create: XOR<ContatoParceiroCreateWithoutParceiroInput, ContatoParceiroUncheckedCreateWithoutParceiroInput>
  }

  export type ContatoParceiroUpdateWithWhereUniqueWithoutParceiroInput = {
    where: ContatoParceiroWhereUniqueInput
    data: XOR<ContatoParceiroUpdateWithoutParceiroInput, ContatoParceiroUncheckedUpdateWithoutParceiroInput>
  }

  export type ContatoParceiroUpdateManyWithWhereWithoutParceiroInput = {
    where: ContatoParceiroScalarWhereInput
    data: XOR<ContatoParceiroUpdateManyMutationInput, ContatoParceiroUncheckedUpdateManyWithoutParceiroInput>
  }

  export type ContatoParceiroScalarWhereInput = {
    AND?: ContatoParceiroScalarWhereInput | ContatoParceiroScalarWhereInput[]
    OR?: ContatoParceiroScalarWhereInput[]
    NOT?: ContatoParceiroScalarWhereInput | ContatoParceiroScalarWhereInput[]
    id?: StringFilter<"ContatoParceiro"> | string
    parceiroId?: StringFilter<"ContatoParceiro"> | string
    nome?: StringFilter<"ContatoParceiro"> | string
    telefoneWhatsapp?: StringFilter<"ContatoParceiro"> | string
    email?: StringNullableFilter<"ContatoParceiro"> | string | null
    cargo?: StringNullableFilter<"ContatoParceiro"> | string | null
    ordemEscalonamento?: IntFilter<"ContatoParceiro"> | number
    createdAt?: DateTimeFilter<"ContatoParceiro"> | Date | string
  }

  export type AudienciaUpsertWithWhereUniqueWithoutParceiroInput = {
    where: AudienciaWhereUniqueInput
    update: XOR<AudienciaUpdateWithoutParceiroInput, AudienciaUncheckedUpdateWithoutParceiroInput>
    create: XOR<AudienciaCreateWithoutParceiroInput, AudienciaUncheckedCreateWithoutParceiroInput>
  }

  export type AudienciaUpdateWithWhereUniqueWithoutParceiroInput = {
    where: AudienciaWhereUniqueInput
    data: XOR<AudienciaUpdateWithoutParceiroInput, AudienciaUncheckedUpdateWithoutParceiroInput>
  }

  export type AudienciaUpdateManyWithWhereWithoutParceiroInput = {
    where: AudienciaScalarWhereInput
    data: XOR<AudienciaUpdateManyMutationInput, AudienciaUncheckedUpdateManyWithoutParceiroInput>
  }

  export type ParceiroCreateWithoutContatosInput = {
    id?: string
    nome: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    audiencias?: AudienciaCreateNestedManyWithoutParceiroInput
  }

  export type ParceiroUncheckedCreateWithoutContatosInput = {
    id?: string
    nome: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    audiencias?: AudienciaUncheckedCreateNestedManyWithoutParceiroInput
  }

  export type ParceiroCreateOrConnectWithoutContatosInput = {
    where: ParceiroWhereUniqueInput
    create: XOR<ParceiroCreateWithoutContatosInput, ParceiroUncheckedCreateWithoutContatosInput>
  }

  export type MensagemCreateWithoutContatoParceiroInput = {
    id?: string
    tipo: $Enums.TipoMensagem
    direcao: $Enums.DirecaoMensagem
    conteudo: string
    respostaBotao?: string | null
    observacao?: string | null
    whatsappMessageId?: string | null
    statusEnvio?: $Enums.StatusEnvioMensagem
    createdAt?: Date | string
    audiencia: AudienciaCreateNestedOneWithoutMensagensInput
    preposto?: PrepostoCreateNestedOneWithoutMensagensInput
  }

  export type MensagemUncheckedCreateWithoutContatoParceiroInput = {
    id?: string
    audienciaId: string
    prepostoId?: string | null
    tipo: $Enums.TipoMensagem
    direcao: $Enums.DirecaoMensagem
    conteudo: string
    respostaBotao?: string | null
    observacao?: string | null
    whatsappMessageId?: string | null
    statusEnvio?: $Enums.StatusEnvioMensagem
    createdAt?: Date | string
  }

  export type MensagemCreateOrConnectWithoutContatoParceiroInput = {
    where: MensagemWhereUniqueInput
    create: XOR<MensagemCreateWithoutContatoParceiroInput, MensagemUncheckedCreateWithoutContatoParceiroInput>
  }

  export type MensagemCreateManyContatoParceiroInputEnvelope = {
    data: MensagemCreateManyContatoParceiroInput | MensagemCreateManyContatoParceiroInput[]
    skipDuplicates?: boolean
  }

  export type ParceiroUpsertWithoutContatosInput = {
    update: XOR<ParceiroUpdateWithoutContatosInput, ParceiroUncheckedUpdateWithoutContatosInput>
    create: XOR<ParceiroCreateWithoutContatosInput, ParceiroUncheckedCreateWithoutContatosInput>
    where?: ParceiroWhereInput
  }

  export type ParceiroUpdateToOneWithWhereWithoutContatosInput = {
    where?: ParceiroWhereInput
    data: XOR<ParceiroUpdateWithoutContatosInput, ParceiroUncheckedUpdateWithoutContatosInput>
  }

  export type ParceiroUpdateWithoutContatosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    audiencias?: AudienciaUpdateManyWithoutParceiroNestedInput
  }

  export type ParceiroUncheckedUpdateWithoutContatosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    audiencias?: AudienciaUncheckedUpdateManyWithoutParceiroNestedInput
  }

  export type MensagemUpsertWithWhereUniqueWithoutContatoParceiroInput = {
    where: MensagemWhereUniqueInput
    update: XOR<MensagemUpdateWithoutContatoParceiroInput, MensagemUncheckedUpdateWithoutContatoParceiroInput>
    create: XOR<MensagemCreateWithoutContatoParceiroInput, MensagemUncheckedCreateWithoutContatoParceiroInput>
  }

  export type MensagemUpdateWithWhereUniqueWithoutContatoParceiroInput = {
    where: MensagemWhereUniqueInput
    data: XOR<MensagemUpdateWithoutContatoParceiroInput, MensagemUncheckedUpdateWithoutContatoParceiroInput>
  }

  export type MensagemUpdateManyWithWhereWithoutContatoParceiroInput = {
    where: MensagemScalarWhereInput
    data: XOR<MensagemUpdateManyMutationInput, MensagemUncheckedUpdateManyWithoutContatoParceiroInput>
  }

  export type AudienciaCreateWithoutImportacaoInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    vara?: string | null
    status?: $Enums.StatusAudiencia
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trt: TrtCreateNestedOneWithoutAudienciasInput
    preposto: PrepostoCreateNestedOneWithoutAudienciasInput
    parceiro: ParceiroCreateNestedOneWithoutAudienciasInput
    mensagens?: MensagemCreateNestedManyWithoutAudienciaInput
    historicoStatus?: HistoricoStatusCreateNestedManyWithoutAudienciaInput
    relatorio?: RelatorioAudienciaCreateNestedOneWithoutAudienciaInput
    substituicoes?: SubstituicaoCreateNestedManyWithoutAudienciaInput
  }

  export type AudienciaUncheckedCreateWithoutImportacaoInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    trtId: string
    vara?: string | null
    status?: $Enums.StatusAudiencia
    prepostoId: string
    parceiroId: string
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mensagens?: MensagemUncheckedCreateNestedManyWithoutAudienciaInput
    historicoStatus?: HistoricoStatusUncheckedCreateNestedManyWithoutAudienciaInput
    relatorio?: RelatorioAudienciaUncheckedCreateNestedOneWithoutAudienciaInput
    substituicoes?: SubstituicaoUncheckedCreateNestedManyWithoutAudienciaInput
  }

  export type AudienciaCreateOrConnectWithoutImportacaoInput = {
    where: AudienciaWhereUniqueInput
    create: XOR<AudienciaCreateWithoutImportacaoInput, AudienciaUncheckedCreateWithoutImportacaoInput>
  }

  export type AudienciaCreateManyImportacaoInputEnvelope = {
    data: AudienciaCreateManyImportacaoInput | AudienciaCreateManyImportacaoInput[]
    skipDuplicates?: boolean
  }

  export type AudienciaUpsertWithWhereUniqueWithoutImportacaoInput = {
    where: AudienciaWhereUniqueInput
    update: XOR<AudienciaUpdateWithoutImportacaoInput, AudienciaUncheckedUpdateWithoutImportacaoInput>
    create: XOR<AudienciaCreateWithoutImportacaoInput, AudienciaUncheckedCreateWithoutImportacaoInput>
  }

  export type AudienciaUpdateWithWhereUniqueWithoutImportacaoInput = {
    where: AudienciaWhereUniqueInput
    data: XOR<AudienciaUpdateWithoutImportacaoInput, AudienciaUncheckedUpdateWithoutImportacaoInput>
  }

  export type AudienciaUpdateManyWithWhereWithoutImportacaoInput = {
    where: AudienciaScalarWhereInput
    data: XOR<AudienciaUpdateManyMutationInput, AudienciaUncheckedUpdateManyWithoutImportacaoInput>
  }

  export type TrtCreateWithoutAudienciasInput = {
    id?: string
    numero: string
    nome: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrtUncheckedCreateWithoutAudienciasInput = {
    id?: string
    numero: string
    nome: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrtCreateOrConnectWithoutAudienciasInput = {
    where: TrtWhereUniqueInput
    create: XOR<TrtCreateWithoutAudienciasInput, TrtUncheckedCreateWithoutAudienciasInput>
  }

  export type PrepostoCreateWithoutAudienciasInput = {
    id?: string
    nome: string
    telefoneWhatsapp: string
    email?: string | null
    cpf?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    mensagens?: MensagemCreateNestedManyWithoutPrepostoInput
    substituicoesAnterior?: SubstituicaoCreateNestedManyWithoutPrepostoAnteriorInput
    substituicoesNovo?: SubstituicaoCreateNestedManyWithoutPrepostoNovoInput
  }

  export type PrepostoUncheckedCreateWithoutAudienciasInput = {
    id?: string
    nome: string
    telefoneWhatsapp: string
    email?: string | null
    cpf?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    mensagens?: MensagemUncheckedCreateNestedManyWithoutPrepostoInput
    substituicoesAnterior?: SubstituicaoUncheckedCreateNestedManyWithoutPrepostoAnteriorInput
    substituicoesNovo?: SubstituicaoUncheckedCreateNestedManyWithoutPrepostoNovoInput
  }

  export type PrepostoCreateOrConnectWithoutAudienciasInput = {
    where: PrepostoWhereUniqueInput
    create: XOR<PrepostoCreateWithoutAudienciasInput, PrepostoUncheckedCreateWithoutAudienciasInput>
  }

  export type ParceiroCreateWithoutAudienciasInput = {
    id?: string
    nome: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contatos?: ContatoParceiroCreateNestedManyWithoutParceiroInput
  }

  export type ParceiroUncheckedCreateWithoutAudienciasInput = {
    id?: string
    nome: string
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contatos?: ContatoParceiroUncheckedCreateNestedManyWithoutParceiroInput
  }

  export type ParceiroCreateOrConnectWithoutAudienciasInput = {
    where: ParceiroWhereUniqueInput
    create: XOR<ParceiroCreateWithoutAudienciasInput, ParceiroUncheckedCreateWithoutAudienciasInput>
  }

  export type ImportacaoCreateWithoutAudienciasInput = {
    id?: string
    nomeArquivo: string
    totalRegistros?: number
    registrosImportados?: number
    registrosIgnorados?: number
    mapeamentoColunas?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.StatusImportacao
    erros?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ImportacaoUncheckedCreateWithoutAudienciasInput = {
    id?: string
    nomeArquivo: string
    totalRegistros?: number
    registrosImportados?: number
    registrosIgnorados?: number
    mapeamentoColunas?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.StatusImportacao
    erros?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ImportacaoCreateOrConnectWithoutAudienciasInput = {
    where: ImportacaoWhereUniqueInput
    create: XOR<ImportacaoCreateWithoutAudienciasInput, ImportacaoUncheckedCreateWithoutAudienciasInput>
  }

  export type MensagemCreateWithoutAudienciaInput = {
    id?: string
    tipo: $Enums.TipoMensagem
    direcao: $Enums.DirecaoMensagem
    conteudo: string
    respostaBotao?: string | null
    observacao?: string | null
    whatsappMessageId?: string | null
    statusEnvio?: $Enums.StatusEnvioMensagem
    createdAt?: Date | string
    preposto?: PrepostoCreateNestedOneWithoutMensagensInput
    contatoParceiro?: ContatoParceiroCreateNestedOneWithoutMensagensInput
  }

  export type MensagemUncheckedCreateWithoutAudienciaInput = {
    id?: string
    prepostoId?: string | null
    contatoParceiroId?: string | null
    tipo: $Enums.TipoMensagem
    direcao: $Enums.DirecaoMensagem
    conteudo: string
    respostaBotao?: string | null
    observacao?: string | null
    whatsappMessageId?: string | null
    statusEnvio?: $Enums.StatusEnvioMensagem
    createdAt?: Date | string
  }

  export type MensagemCreateOrConnectWithoutAudienciaInput = {
    where: MensagemWhereUniqueInput
    create: XOR<MensagemCreateWithoutAudienciaInput, MensagemUncheckedCreateWithoutAudienciaInput>
  }

  export type MensagemCreateManyAudienciaInputEnvelope = {
    data: MensagemCreateManyAudienciaInput | MensagemCreateManyAudienciaInput[]
    skipDuplicates?: boolean
  }

  export type HistoricoStatusCreateWithoutAudienciaInput = {
    id?: string
    statusAnterior: $Enums.StatusAudiencia
    statusNovo: $Enums.StatusAudiencia
    motivo?: string | null
    atualizadoPor: string
    createdAt?: Date | string
  }

  export type HistoricoStatusUncheckedCreateWithoutAudienciaInput = {
    id?: string
    statusAnterior: $Enums.StatusAudiencia
    statusNovo: $Enums.StatusAudiencia
    motivo?: string | null
    atualizadoPor: string
    createdAt?: Date | string
  }

  export type HistoricoStatusCreateOrConnectWithoutAudienciaInput = {
    where: HistoricoStatusWhereUniqueInput
    create: XOR<HistoricoStatusCreateWithoutAudienciaInput, HistoricoStatusUncheckedCreateWithoutAudienciaInput>
  }

  export type HistoricoStatusCreateManyAudienciaInputEnvelope = {
    data: HistoricoStatusCreateManyAudienciaInput | HistoricoStatusCreateManyAudienciaInput[]
    skipDuplicates?: boolean
  }

  export type RelatorioAudienciaCreateWithoutAudienciaInput = {
    id?: string
    audienciaOcorreu?: $Enums.OcorrenciaAudiencia | null
    resultado?: $Enums.ResultadoAudiencia | null
    advogadoPresente?: boolean | null
    advogadoDominioCaso?: boolean | null
    problemaRelevante?: boolean | null
    relato?: string | null
    createdAt?: Date | string
  }

  export type RelatorioAudienciaUncheckedCreateWithoutAudienciaInput = {
    id?: string
    audienciaOcorreu?: $Enums.OcorrenciaAudiencia | null
    resultado?: $Enums.ResultadoAudiencia | null
    advogadoPresente?: boolean | null
    advogadoDominioCaso?: boolean | null
    problemaRelevante?: boolean | null
    relato?: string | null
    createdAt?: Date | string
  }

  export type RelatorioAudienciaCreateOrConnectWithoutAudienciaInput = {
    where: RelatorioAudienciaWhereUniqueInput
    create: XOR<RelatorioAudienciaCreateWithoutAudienciaInput, RelatorioAudienciaUncheckedCreateWithoutAudienciaInput>
  }

  export type SubstituicaoCreateWithoutAudienciaInput = {
    id?: string
    motivo: string
    status?: $Enums.StatusSubstituicao
    createdAt?: Date | string
    resolvidoEm?: Date | string | null
    prepostoAnterior: PrepostoCreateNestedOneWithoutSubstituicoesAnteriorInput
    prepostoNovo?: PrepostoCreateNestedOneWithoutSubstituicoesNovoInput
  }

  export type SubstituicaoUncheckedCreateWithoutAudienciaInput = {
    id?: string
    prepostoAnteriorId: string
    prepostoNovoId?: string | null
    motivo: string
    status?: $Enums.StatusSubstituicao
    createdAt?: Date | string
    resolvidoEm?: Date | string | null
  }

  export type SubstituicaoCreateOrConnectWithoutAudienciaInput = {
    where: SubstituicaoWhereUniqueInput
    create: XOR<SubstituicaoCreateWithoutAudienciaInput, SubstituicaoUncheckedCreateWithoutAudienciaInput>
  }

  export type SubstituicaoCreateManyAudienciaInputEnvelope = {
    data: SubstituicaoCreateManyAudienciaInput | SubstituicaoCreateManyAudienciaInput[]
    skipDuplicates?: boolean
  }

  export type TrtUpsertWithoutAudienciasInput = {
    update: XOR<TrtUpdateWithoutAudienciasInput, TrtUncheckedUpdateWithoutAudienciasInput>
    create: XOR<TrtCreateWithoutAudienciasInput, TrtUncheckedCreateWithoutAudienciasInput>
    where?: TrtWhereInput
  }

  export type TrtUpdateToOneWithWhereWithoutAudienciasInput = {
    where?: TrtWhereInput
    data: XOR<TrtUpdateWithoutAudienciasInput, TrtUncheckedUpdateWithoutAudienciasInput>
  }

  export type TrtUpdateWithoutAudienciasInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrtUncheckedUpdateWithoutAudienciasInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrepostoUpsertWithoutAudienciasInput = {
    update: XOR<PrepostoUpdateWithoutAudienciasInput, PrepostoUncheckedUpdateWithoutAudienciasInput>
    create: XOR<PrepostoCreateWithoutAudienciasInput, PrepostoUncheckedCreateWithoutAudienciasInput>
    where?: PrepostoWhereInput
  }

  export type PrepostoUpdateToOneWithWhereWithoutAudienciasInput = {
    where?: PrepostoWhereInput
    data: XOR<PrepostoUpdateWithoutAudienciasInput, PrepostoUncheckedUpdateWithoutAudienciasInput>
  }

  export type PrepostoUpdateWithoutAudienciasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mensagens?: MensagemUpdateManyWithoutPrepostoNestedInput
    substituicoesAnterior?: SubstituicaoUpdateManyWithoutPrepostoAnteriorNestedInput
    substituicoesNovo?: SubstituicaoUpdateManyWithoutPrepostoNovoNestedInput
  }

  export type PrepostoUncheckedUpdateWithoutAudienciasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mensagens?: MensagemUncheckedUpdateManyWithoutPrepostoNestedInput
    substituicoesAnterior?: SubstituicaoUncheckedUpdateManyWithoutPrepostoAnteriorNestedInput
    substituicoesNovo?: SubstituicaoUncheckedUpdateManyWithoutPrepostoNovoNestedInput
  }

  export type ParceiroUpsertWithoutAudienciasInput = {
    update: XOR<ParceiroUpdateWithoutAudienciasInput, ParceiroUncheckedUpdateWithoutAudienciasInput>
    create: XOR<ParceiroCreateWithoutAudienciasInput, ParceiroUncheckedCreateWithoutAudienciasInput>
    where?: ParceiroWhereInput
  }

  export type ParceiroUpdateToOneWithWhereWithoutAudienciasInput = {
    where?: ParceiroWhereInput
    data: XOR<ParceiroUpdateWithoutAudienciasInput, ParceiroUncheckedUpdateWithoutAudienciasInput>
  }

  export type ParceiroUpdateWithoutAudienciasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contatos?: ContatoParceiroUpdateManyWithoutParceiroNestedInput
  }

  export type ParceiroUncheckedUpdateWithoutAudienciasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contatos?: ContatoParceiroUncheckedUpdateManyWithoutParceiroNestedInput
  }

  export type ImportacaoUpsertWithoutAudienciasInput = {
    update: XOR<ImportacaoUpdateWithoutAudienciasInput, ImportacaoUncheckedUpdateWithoutAudienciasInput>
    create: XOR<ImportacaoCreateWithoutAudienciasInput, ImportacaoUncheckedCreateWithoutAudienciasInput>
    where?: ImportacaoWhereInput
  }

  export type ImportacaoUpdateToOneWithWhereWithoutAudienciasInput = {
    where?: ImportacaoWhereInput
    data: XOR<ImportacaoUpdateWithoutAudienciasInput, ImportacaoUncheckedUpdateWithoutAudienciasInput>
  }

  export type ImportacaoUpdateWithoutAudienciasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeArquivo?: StringFieldUpdateOperationsInput | string
    totalRegistros?: IntFieldUpdateOperationsInput | number
    registrosImportados?: IntFieldUpdateOperationsInput | number
    registrosIgnorados?: IntFieldUpdateOperationsInput | number
    mapeamentoColunas?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumStatusImportacaoFieldUpdateOperationsInput | $Enums.StatusImportacao
    erros?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImportacaoUncheckedUpdateWithoutAudienciasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeArquivo?: StringFieldUpdateOperationsInput | string
    totalRegistros?: IntFieldUpdateOperationsInput | number
    registrosImportados?: IntFieldUpdateOperationsInput | number
    registrosIgnorados?: IntFieldUpdateOperationsInput | number
    mapeamentoColunas?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumStatusImportacaoFieldUpdateOperationsInput | $Enums.StatusImportacao
    erros?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MensagemUpsertWithWhereUniqueWithoutAudienciaInput = {
    where: MensagemWhereUniqueInput
    update: XOR<MensagemUpdateWithoutAudienciaInput, MensagemUncheckedUpdateWithoutAudienciaInput>
    create: XOR<MensagemCreateWithoutAudienciaInput, MensagemUncheckedCreateWithoutAudienciaInput>
  }

  export type MensagemUpdateWithWhereUniqueWithoutAudienciaInput = {
    where: MensagemWhereUniqueInput
    data: XOR<MensagemUpdateWithoutAudienciaInput, MensagemUncheckedUpdateWithoutAudienciaInput>
  }

  export type MensagemUpdateManyWithWhereWithoutAudienciaInput = {
    where: MensagemScalarWhereInput
    data: XOR<MensagemUpdateManyMutationInput, MensagemUncheckedUpdateManyWithoutAudienciaInput>
  }

  export type HistoricoStatusUpsertWithWhereUniqueWithoutAudienciaInput = {
    where: HistoricoStatusWhereUniqueInput
    update: XOR<HistoricoStatusUpdateWithoutAudienciaInput, HistoricoStatusUncheckedUpdateWithoutAudienciaInput>
    create: XOR<HistoricoStatusCreateWithoutAudienciaInput, HistoricoStatusUncheckedCreateWithoutAudienciaInput>
  }

  export type HistoricoStatusUpdateWithWhereUniqueWithoutAudienciaInput = {
    where: HistoricoStatusWhereUniqueInput
    data: XOR<HistoricoStatusUpdateWithoutAudienciaInput, HistoricoStatusUncheckedUpdateWithoutAudienciaInput>
  }

  export type HistoricoStatusUpdateManyWithWhereWithoutAudienciaInput = {
    where: HistoricoStatusScalarWhereInput
    data: XOR<HistoricoStatusUpdateManyMutationInput, HistoricoStatusUncheckedUpdateManyWithoutAudienciaInput>
  }

  export type HistoricoStatusScalarWhereInput = {
    AND?: HistoricoStatusScalarWhereInput | HistoricoStatusScalarWhereInput[]
    OR?: HistoricoStatusScalarWhereInput[]
    NOT?: HistoricoStatusScalarWhereInput | HistoricoStatusScalarWhereInput[]
    id?: StringFilter<"HistoricoStatus"> | string
    audienciaId?: StringFilter<"HistoricoStatus"> | string
    statusAnterior?: EnumStatusAudienciaFilter<"HistoricoStatus"> | $Enums.StatusAudiencia
    statusNovo?: EnumStatusAudienciaFilter<"HistoricoStatus"> | $Enums.StatusAudiencia
    motivo?: StringNullableFilter<"HistoricoStatus"> | string | null
    atualizadoPor?: StringFilter<"HistoricoStatus"> | string
    createdAt?: DateTimeFilter<"HistoricoStatus"> | Date | string
  }

  export type RelatorioAudienciaUpsertWithoutAudienciaInput = {
    update: XOR<RelatorioAudienciaUpdateWithoutAudienciaInput, RelatorioAudienciaUncheckedUpdateWithoutAudienciaInput>
    create: XOR<RelatorioAudienciaCreateWithoutAudienciaInput, RelatorioAudienciaUncheckedCreateWithoutAudienciaInput>
    where?: RelatorioAudienciaWhereInput
  }

  export type RelatorioAudienciaUpdateToOneWithWhereWithoutAudienciaInput = {
    where?: RelatorioAudienciaWhereInput
    data: XOR<RelatorioAudienciaUpdateWithoutAudienciaInput, RelatorioAudienciaUncheckedUpdateWithoutAudienciaInput>
  }

  export type RelatorioAudienciaUpdateWithoutAudienciaInput = {
    id?: StringFieldUpdateOperationsInput | string
    audienciaOcorreu?: NullableEnumOcorrenciaAudienciaFieldUpdateOperationsInput | $Enums.OcorrenciaAudiencia | null
    resultado?: NullableEnumResultadoAudienciaFieldUpdateOperationsInput | $Enums.ResultadoAudiencia | null
    advogadoPresente?: NullableBoolFieldUpdateOperationsInput | boolean | null
    advogadoDominioCaso?: NullableBoolFieldUpdateOperationsInput | boolean | null
    problemaRelevante?: NullableBoolFieldUpdateOperationsInput | boolean | null
    relato?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RelatorioAudienciaUncheckedUpdateWithoutAudienciaInput = {
    id?: StringFieldUpdateOperationsInput | string
    audienciaOcorreu?: NullableEnumOcorrenciaAudienciaFieldUpdateOperationsInput | $Enums.OcorrenciaAudiencia | null
    resultado?: NullableEnumResultadoAudienciaFieldUpdateOperationsInput | $Enums.ResultadoAudiencia | null
    advogadoPresente?: NullableBoolFieldUpdateOperationsInput | boolean | null
    advogadoDominioCaso?: NullableBoolFieldUpdateOperationsInput | boolean | null
    problemaRelevante?: NullableBoolFieldUpdateOperationsInput | boolean | null
    relato?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubstituicaoUpsertWithWhereUniqueWithoutAudienciaInput = {
    where: SubstituicaoWhereUniqueInput
    update: XOR<SubstituicaoUpdateWithoutAudienciaInput, SubstituicaoUncheckedUpdateWithoutAudienciaInput>
    create: XOR<SubstituicaoCreateWithoutAudienciaInput, SubstituicaoUncheckedCreateWithoutAudienciaInput>
  }

  export type SubstituicaoUpdateWithWhereUniqueWithoutAudienciaInput = {
    where: SubstituicaoWhereUniqueInput
    data: XOR<SubstituicaoUpdateWithoutAudienciaInput, SubstituicaoUncheckedUpdateWithoutAudienciaInput>
  }

  export type SubstituicaoUpdateManyWithWhereWithoutAudienciaInput = {
    where: SubstituicaoScalarWhereInput
    data: XOR<SubstituicaoUpdateManyMutationInput, SubstituicaoUncheckedUpdateManyWithoutAudienciaInput>
  }

  export type AudienciaCreateWithoutMensagensInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    vara?: string | null
    status?: $Enums.StatusAudiencia
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trt: TrtCreateNestedOneWithoutAudienciasInput
    preposto: PrepostoCreateNestedOneWithoutAudienciasInput
    parceiro: ParceiroCreateNestedOneWithoutAudienciasInput
    importacao?: ImportacaoCreateNestedOneWithoutAudienciasInput
    historicoStatus?: HistoricoStatusCreateNestedManyWithoutAudienciaInput
    relatorio?: RelatorioAudienciaCreateNestedOneWithoutAudienciaInput
    substituicoes?: SubstituicaoCreateNestedManyWithoutAudienciaInput
  }

  export type AudienciaUncheckedCreateWithoutMensagensInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    trtId: string
    vara?: string | null
    status?: $Enums.StatusAudiencia
    prepostoId: string
    parceiroId: string
    importacaoId?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    historicoStatus?: HistoricoStatusUncheckedCreateNestedManyWithoutAudienciaInput
    relatorio?: RelatorioAudienciaUncheckedCreateNestedOneWithoutAudienciaInput
    substituicoes?: SubstituicaoUncheckedCreateNestedManyWithoutAudienciaInput
  }

  export type AudienciaCreateOrConnectWithoutMensagensInput = {
    where: AudienciaWhereUniqueInput
    create: XOR<AudienciaCreateWithoutMensagensInput, AudienciaUncheckedCreateWithoutMensagensInput>
  }

  export type PrepostoCreateWithoutMensagensInput = {
    id?: string
    nome: string
    telefoneWhatsapp: string
    email?: string | null
    cpf?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    audiencias?: AudienciaCreateNestedManyWithoutPrepostoInput
    substituicoesAnterior?: SubstituicaoCreateNestedManyWithoutPrepostoAnteriorInput
    substituicoesNovo?: SubstituicaoCreateNestedManyWithoutPrepostoNovoInput
  }

  export type PrepostoUncheckedCreateWithoutMensagensInput = {
    id?: string
    nome: string
    telefoneWhatsapp: string
    email?: string | null
    cpf?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    audiencias?: AudienciaUncheckedCreateNestedManyWithoutPrepostoInput
    substituicoesAnterior?: SubstituicaoUncheckedCreateNestedManyWithoutPrepostoAnteriorInput
    substituicoesNovo?: SubstituicaoUncheckedCreateNestedManyWithoutPrepostoNovoInput
  }

  export type PrepostoCreateOrConnectWithoutMensagensInput = {
    where: PrepostoWhereUniqueInput
    create: XOR<PrepostoCreateWithoutMensagensInput, PrepostoUncheckedCreateWithoutMensagensInput>
  }

  export type ContatoParceiroCreateWithoutMensagensInput = {
    id?: string
    nome: string
    telefoneWhatsapp: string
    email?: string | null
    cargo?: string | null
    ordemEscalonamento?: number
    createdAt?: Date | string
    parceiro: ParceiroCreateNestedOneWithoutContatosInput
  }

  export type ContatoParceiroUncheckedCreateWithoutMensagensInput = {
    id?: string
    parceiroId: string
    nome: string
    telefoneWhatsapp: string
    email?: string | null
    cargo?: string | null
    ordemEscalonamento?: number
    createdAt?: Date | string
  }

  export type ContatoParceiroCreateOrConnectWithoutMensagensInput = {
    where: ContatoParceiroWhereUniqueInput
    create: XOR<ContatoParceiroCreateWithoutMensagensInput, ContatoParceiroUncheckedCreateWithoutMensagensInput>
  }

  export type AudienciaUpsertWithoutMensagensInput = {
    update: XOR<AudienciaUpdateWithoutMensagensInput, AudienciaUncheckedUpdateWithoutMensagensInput>
    create: XOR<AudienciaCreateWithoutMensagensInput, AudienciaUncheckedCreateWithoutMensagensInput>
    where?: AudienciaWhereInput
  }

  export type AudienciaUpdateToOneWithWhereWithoutMensagensInput = {
    where?: AudienciaWhereInput
    data: XOR<AudienciaUpdateWithoutMensagensInput, AudienciaUncheckedUpdateWithoutMensagensInput>
  }

  export type AudienciaUpdateWithoutMensagensInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trt?: TrtUpdateOneRequiredWithoutAudienciasNestedInput
    preposto?: PrepostoUpdateOneRequiredWithoutAudienciasNestedInput
    parceiro?: ParceiroUpdateOneRequiredWithoutAudienciasNestedInput
    importacao?: ImportacaoUpdateOneWithoutAudienciasNestedInput
    historicoStatus?: HistoricoStatusUpdateManyWithoutAudienciaNestedInput
    relatorio?: RelatorioAudienciaUpdateOneWithoutAudienciaNestedInput
    substituicoes?: SubstituicaoUpdateManyWithoutAudienciaNestedInput
  }

  export type AudienciaUncheckedUpdateWithoutMensagensInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    trtId?: StringFieldUpdateOperationsInput | string
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    prepostoId?: StringFieldUpdateOperationsInput | string
    parceiroId?: StringFieldUpdateOperationsInput | string
    importacaoId?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    historicoStatus?: HistoricoStatusUncheckedUpdateManyWithoutAudienciaNestedInput
    relatorio?: RelatorioAudienciaUncheckedUpdateOneWithoutAudienciaNestedInput
    substituicoes?: SubstituicaoUncheckedUpdateManyWithoutAudienciaNestedInput
  }

  export type PrepostoUpsertWithoutMensagensInput = {
    update: XOR<PrepostoUpdateWithoutMensagensInput, PrepostoUncheckedUpdateWithoutMensagensInput>
    create: XOR<PrepostoCreateWithoutMensagensInput, PrepostoUncheckedCreateWithoutMensagensInput>
    where?: PrepostoWhereInput
  }

  export type PrepostoUpdateToOneWithWhereWithoutMensagensInput = {
    where?: PrepostoWhereInput
    data: XOR<PrepostoUpdateWithoutMensagensInput, PrepostoUncheckedUpdateWithoutMensagensInput>
  }

  export type PrepostoUpdateWithoutMensagensInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    audiencias?: AudienciaUpdateManyWithoutPrepostoNestedInput
    substituicoesAnterior?: SubstituicaoUpdateManyWithoutPrepostoAnteriorNestedInput
    substituicoesNovo?: SubstituicaoUpdateManyWithoutPrepostoNovoNestedInput
  }

  export type PrepostoUncheckedUpdateWithoutMensagensInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    audiencias?: AudienciaUncheckedUpdateManyWithoutPrepostoNestedInput
    substituicoesAnterior?: SubstituicaoUncheckedUpdateManyWithoutPrepostoAnteriorNestedInput
    substituicoesNovo?: SubstituicaoUncheckedUpdateManyWithoutPrepostoNovoNestedInput
  }

  export type ContatoParceiroUpsertWithoutMensagensInput = {
    update: XOR<ContatoParceiroUpdateWithoutMensagensInput, ContatoParceiroUncheckedUpdateWithoutMensagensInput>
    create: XOR<ContatoParceiroCreateWithoutMensagensInput, ContatoParceiroUncheckedCreateWithoutMensagensInput>
    where?: ContatoParceiroWhereInput
  }

  export type ContatoParceiroUpdateToOneWithWhereWithoutMensagensInput = {
    where?: ContatoParceiroWhereInput
    data: XOR<ContatoParceiroUpdateWithoutMensagensInput, ContatoParceiroUncheckedUpdateWithoutMensagensInput>
  }

  export type ContatoParceiroUpdateWithoutMensagensInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    ordemEscalonamento?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parceiro?: ParceiroUpdateOneRequiredWithoutContatosNestedInput
  }

  export type ContatoParceiroUncheckedUpdateWithoutMensagensInput = {
    id?: StringFieldUpdateOperationsInput | string
    parceiroId?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    ordemEscalonamento?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AudienciaCreateWithoutRelatorioInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    vara?: string | null
    status?: $Enums.StatusAudiencia
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trt: TrtCreateNestedOneWithoutAudienciasInput
    preposto: PrepostoCreateNestedOneWithoutAudienciasInput
    parceiro: ParceiroCreateNestedOneWithoutAudienciasInput
    importacao?: ImportacaoCreateNestedOneWithoutAudienciasInput
    mensagens?: MensagemCreateNestedManyWithoutAudienciaInput
    historicoStatus?: HistoricoStatusCreateNestedManyWithoutAudienciaInput
    substituicoes?: SubstituicaoCreateNestedManyWithoutAudienciaInput
  }

  export type AudienciaUncheckedCreateWithoutRelatorioInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    trtId: string
    vara?: string | null
    status?: $Enums.StatusAudiencia
    prepostoId: string
    parceiroId: string
    importacaoId?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mensagens?: MensagemUncheckedCreateNestedManyWithoutAudienciaInput
    historicoStatus?: HistoricoStatusUncheckedCreateNestedManyWithoutAudienciaInput
    substituicoes?: SubstituicaoUncheckedCreateNestedManyWithoutAudienciaInput
  }

  export type AudienciaCreateOrConnectWithoutRelatorioInput = {
    where: AudienciaWhereUniqueInput
    create: XOR<AudienciaCreateWithoutRelatorioInput, AudienciaUncheckedCreateWithoutRelatorioInput>
  }

  export type AudienciaUpsertWithoutRelatorioInput = {
    update: XOR<AudienciaUpdateWithoutRelatorioInput, AudienciaUncheckedUpdateWithoutRelatorioInput>
    create: XOR<AudienciaCreateWithoutRelatorioInput, AudienciaUncheckedCreateWithoutRelatorioInput>
    where?: AudienciaWhereInput
  }

  export type AudienciaUpdateToOneWithWhereWithoutRelatorioInput = {
    where?: AudienciaWhereInput
    data: XOR<AudienciaUpdateWithoutRelatorioInput, AudienciaUncheckedUpdateWithoutRelatorioInput>
  }

  export type AudienciaUpdateWithoutRelatorioInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trt?: TrtUpdateOneRequiredWithoutAudienciasNestedInput
    preposto?: PrepostoUpdateOneRequiredWithoutAudienciasNestedInput
    parceiro?: ParceiroUpdateOneRequiredWithoutAudienciasNestedInput
    importacao?: ImportacaoUpdateOneWithoutAudienciasNestedInput
    mensagens?: MensagemUpdateManyWithoutAudienciaNestedInput
    historicoStatus?: HistoricoStatusUpdateManyWithoutAudienciaNestedInput
    substituicoes?: SubstituicaoUpdateManyWithoutAudienciaNestedInput
  }

  export type AudienciaUncheckedUpdateWithoutRelatorioInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    trtId?: StringFieldUpdateOperationsInput | string
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    prepostoId?: StringFieldUpdateOperationsInput | string
    parceiroId?: StringFieldUpdateOperationsInput | string
    importacaoId?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mensagens?: MensagemUncheckedUpdateManyWithoutAudienciaNestedInput
    historicoStatus?: HistoricoStatusUncheckedUpdateManyWithoutAudienciaNestedInput
    substituicoes?: SubstituicaoUncheckedUpdateManyWithoutAudienciaNestedInput
  }

  export type AudienciaCreateWithoutHistoricoStatusInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    vara?: string | null
    status?: $Enums.StatusAudiencia
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trt: TrtCreateNestedOneWithoutAudienciasInput
    preposto: PrepostoCreateNestedOneWithoutAudienciasInput
    parceiro: ParceiroCreateNestedOneWithoutAudienciasInput
    importacao?: ImportacaoCreateNestedOneWithoutAudienciasInput
    mensagens?: MensagemCreateNestedManyWithoutAudienciaInput
    relatorio?: RelatorioAudienciaCreateNestedOneWithoutAudienciaInput
    substituicoes?: SubstituicaoCreateNestedManyWithoutAudienciaInput
  }

  export type AudienciaUncheckedCreateWithoutHistoricoStatusInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    trtId: string
    vara?: string | null
    status?: $Enums.StatusAudiencia
    prepostoId: string
    parceiroId: string
    importacaoId?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mensagens?: MensagemUncheckedCreateNestedManyWithoutAudienciaInput
    relatorio?: RelatorioAudienciaUncheckedCreateNestedOneWithoutAudienciaInput
    substituicoes?: SubstituicaoUncheckedCreateNestedManyWithoutAudienciaInput
  }

  export type AudienciaCreateOrConnectWithoutHistoricoStatusInput = {
    where: AudienciaWhereUniqueInput
    create: XOR<AudienciaCreateWithoutHistoricoStatusInput, AudienciaUncheckedCreateWithoutHistoricoStatusInput>
  }

  export type AudienciaUpsertWithoutHistoricoStatusInput = {
    update: XOR<AudienciaUpdateWithoutHistoricoStatusInput, AudienciaUncheckedUpdateWithoutHistoricoStatusInput>
    create: XOR<AudienciaCreateWithoutHistoricoStatusInput, AudienciaUncheckedCreateWithoutHistoricoStatusInput>
    where?: AudienciaWhereInput
  }

  export type AudienciaUpdateToOneWithWhereWithoutHistoricoStatusInput = {
    where?: AudienciaWhereInput
    data: XOR<AudienciaUpdateWithoutHistoricoStatusInput, AudienciaUncheckedUpdateWithoutHistoricoStatusInput>
  }

  export type AudienciaUpdateWithoutHistoricoStatusInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trt?: TrtUpdateOneRequiredWithoutAudienciasNestedInput
    preposto?: PrepostoUpdateOneRequiredWithoutAudienciasNestedInput
    parceiro?: ParceiroUpdateOneRequiredWithoutAudienciasNestedInput
    importacao?: ImportacaoUpdateOneWithoutAudienciasNestedInput
    mensagens?: MensagemUpdateManyWithoutAudienciaNestedInput
    relatorio?: RelatorioAudienciaUpdateOneWithoutAudienciaNestedInput
    substituicoes?: SubstituicaoUpdateManyWithoutAudienciaNestedInput
  }

  export type AudienciaUncheckedUpdateWithoutHistoricoStatusInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    trtId?: StringFieldUpdateOperationsInput | string
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    prepostoId?: StringFieldUpdateOperationsInput | string
    parceiroId?: StringFieldUpdateOperationsInput | string
    importacaoId?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mensagens?: MensagemUncheckedUpdateManyWithoutAudienciaNestedInput
    relatorio?: RelatorioAudienciaUncheckedUpdateOneWithoutAudienciaNestedInput
    substituicoes?: SubstituicaoUncheckedUpdateManyWithoutAudienciaNestedInput
  }

  export type AudienciaCreateWithoutSubstituicoesInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    vara?: string | null
    status?: $Enums.StatusAudiencia
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trt: TrtCreateNestedOneWithoutAudienciasInput
    preposto: PrepostoCreateNestedOneWithoutAudienciasInput
    parceiro: ParceiroCreateNestedOneWithoutAudienciasInput
    importacao?: ImportacaoCreateNestedOneWithoutAudienciasInput
    mensagens?: MensagemCreateNestedManyWithoutAudienciaInput
    historicoStatus?: HistoricoStatusCreateNestedManyWithoutAudienciaInput
    relatorio?: RelatorioAudienciaCreateNestedOneWithoutAudienciaInput
  }

  export type AudienciaUncheckedCreateWithoutSubstituicoesInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    trtId: string
    vara?: string | null
    status?: $Enums.StatusAudiencia
    prepostoId: string
    parceiroId: string
    importacaoId?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mensagens?: MensagemUncheckedCreateNestedManyWithoutAudienciaInput
    historicoStatus?: HistoricoStatusUncheckedCreateNestedManyWithoutAudienciaInput
    relatorio?: RelatorioAudienciaUncheckedCreateNestedOneWithoutAudienciaInput
  }

  export type AudienciaCreateOrConnectWithoutSubstituicoesInput = {
    where: AudienciaWhereUniqueInput
    create: XOR<AudienciaCreateWithoutSubstituicoesInput, AudienciaUncheckedCreateWithoutSubstituicoesInput>
  }

  export type PrepostoCreateWithoutSubstituicoesAnteriorInput = {
    id?: string
    nome: string
    telefoneWhatsapp: string
    email?: string | null
    cpf?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    audiencias?: AudienciaCreateNestedManyWithoutPrepostoInput
    mensagens?: MensagemCreateNestedManyWithoutPrepostoInput
    substituicoesNovo?: SubstituicaoCreateNestedManyWithoutPrepostoNovoInput
  }

  export type PrepostoUncheckedCreateWithoutSubstituicoesAnteriorInput = {
    id?: string
    nome: string
    telefoneWhatsapp: string
    email?: string | null
    cpf?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    audiencias?: AudienciaUncheckedCreateNestedManyWithoutPrepostoInput
    mensagens?: MensagemUncheckedCreateNestedManyWithoutPrepostoInput
    substituicoesNovo?: SubstituicaoUncheckedCreateNestedManyWithoutPrepostoNovoInput
  }

  export type PrepostoCreateOrConnectWithoutSubstituicoesAnteriorInput = {
    where: PrepostoWhereUniqueInput
    create: XOR<PrepostoCreateWithoutSubstituicoesAnteriorInput, PrepostoUncheckedCreateWithoutSubstituicoesAnteriorInput>
  }

  export type PrepostoCreateWithoutSubstituicoesNovoInput = {
    id?: string
    nome: string
    telefoneWhatsapp: string
    email?: string | null
    cpf?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    audiencias?: AudienciaCreateNestedManyWithoutPrepostoInput
    mensagens?: MensagemCreateNestedManyWithoutPrepostoInput
    substituicoesAnterior?: SubstituicaoCreateNestedManyWithoutPrepostoAnteriorInput
  }

  export type PrepostoUncheckedCreateWithoutSubstituicoesNovoInput = {
    id?: string
    nome: string
    telefoneWhatsapp: string
    email?: string | null
    cpf?: string | null
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    audiencias?: AudienciaUncheckedCreateNestedManyWithoutPrepostoInput
    mensagens?: MensagemUncheckedCreateNestedManyWithoutPrepostoInput
    substituicoesAnterior?: SubstituicaoUncheckedCreateNestedManyWithoutPrepostoAnteriorInput
  }

  export type PrepostoCreateOrConnectWithoutSubstituicoesNovoInput = {
    where: PrepostoWhereUniqueInput
    create: XOR<PrepostoCreateWithoutSubstituicoesNovoInput, PrepostoUncheckedCreateWithoutSubstituicoesNovoInput>
  }

  export type AudienciaUpsertWithoutSubstituicoesInput = {
    update: XOR<AudienciaUpdateWithoutSubstituicoesInput, AudienciaUncheckedUpdateWithoutSubstituicoesInput>
    create: XOR<AudienciaCreateWithoutSubstituicoesInput, AudienciaUncheckedCreateWithoutSubstituicoesInput>
    where?: AudienciaWhereInput
  }

  export type AudienciaUpdateToOneWithWhereWithoutSubstituicoesInput = {
    where?: AudienciaWhereInput
    data: XOR<AudienciaUpdateWithoutSubstituicoesInput, AudienciaUncheckedUpdateWithoutSubstituicoesInput>
  }

  export type AudienciaUpdateWithoutSubstituicoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trt?: TrtUpdateOneRequiredWithoutAudienciasNestedInput
    preposto?: PrepostoUpdateOneRequiredWithoutAudienciasNestedInput
    parceiro?: ParceiroUpdateOneRequiredWithoutAudienciasNestedInput
    importacao?: ImportacaoUpdateOneWithoutAudienciasNestedInput
    mensagens?: MensagemUpdateManyWithoutAudienciaNestedInput
    historicoStatus?: HistoricoStatusUpdateManyWithoutAudienciaNestedInput
    relatorio?: RelatorioAudienciaUpdateOneWithoutAudienciaNestedInput
  }

  export type AudienciaUncheckedUpdateWithoutSubstituicoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    trtId?: StringFieldUpdateOperationsInput | string
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    prepostoId?: StringFieldUpdateOperationsInput | string
    parceiroId?: StringFieldUpdateOperationsInput | string
    importacaoId?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mensagens?: MensagemUncheckedUpdateManyWithoutAudienciaNestedInput
    historicoStatus?: HistoricoStatusUncheckedUpdateManyWithoutAudienciaNestedInput
    relatorio?: RelatorioAudienciaUncheckedUpdateOneWithoutAudienciaNestedInput
  }

  export type PrepostoUpsertWithoutSubstituicoesAnteriorInput = {
    update: XOR<PrepostoUpdateWithoutSubstituicoesAnteriorInput, PrepostoUncheckedUpdateWithoutSubstituicoesAnteriorInput>
    create: XOR<PrepostoCreateWithoutSubstituicoesAnteriorInput, PrepostoUncheckedCreateWithoutSubstituicoesAnteriorInput>
    where?: PrepostoWhereInput
  }

  export type PrepostoUpdateToOneWithWhereWithoutSubstituicoesAnteriorInput = {
    where?: PrepostoWhereInput
    data: XOR<PrepostoUpdateWithoutSubstituicoesAnteriorInput, PrepostoUncheckedUpdateWithoutSubstituicoesAnteriorInput>
  }

  export type PrepostoUpdateWithoutSubstituicoesAnteriorInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    audiencias?: AudienciaUpdateManyWithoutPrepostoNestedInput
    mensagens?: MensagemUpdateManyWithoutPrepostoNestedInput
    substituicoesNovo?: SubstituicaoUpdateManyWithoutPrepostoNovoNestedInput
  }

  export type PrepostoUncheckedUpdateWithoutSubstituicoesAnteriorInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    audiencias?: AudienciaUncheckedUpdateManyWithoutPrepostoNestedInput
    mensagens?: MensagemUncheckedUpdateManyWithoutPrepostoNestedInput
    substituicoesNovo?: SubstituicaoUncheckedUpdateManyWithoutPrepostoNovoNestedInput
  }

  export type PrepostoUpsertWithoutSubstituicoesNovoInput = {
    update: XOR<PrepostoUpdateWithoutSubstituicoesNovoInput, PrepostoUncheckedUpdateWithoutSubstituicoesNovoInput>
    create: XOR<PrepostoCreateWithoutSubstituicoesNovoInput, PrepostoUncheckedCreateWithoutSubstituicoesNovoInput>
    where?: PrepostoWhereInput
  }

  export type PrepostoUpdateToOneWithWhereWithoutSubstituicoesNovoInput = {
    where?: PrepostoWhereInput
    data: XOR<PrepostoUpdateWithoutSubstituicoesNovoInput, PrepostoUncheckedUpdateWithoutSubstituicoesNovoInput>
  }

  export type PrepostoUpdateWithoutSubstituicoesNovoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    audiencias?: AudienciaUpdateManyWithoutPrepostoNestedInput
    mensagens?: MensagemUpdateManyWithoutPrepostoNestedInput
    substituicoesAnterior?: SubstituicaoUpdateManyWithoutPrepostoAnteriorNestedInput
  }

  export type PrepostoUncheckedUpdateWithoutSubstituicoesNovoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    audiencias?: AudienciaUncheckedUpdateManyWithoutPrepostoNestedInput
    mensagens?: MensagemUncheckedUpdateManyWithoutPrepostoNestedInput
    substituicoesAnterior?: SubstituicaoUncheckedUpdateManyWithoutPrepostoAnteriorNestedInput
  }

  export type AudienciaCreateManyTrtInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    vara?: string | null
    status?: $Enums.StatusAudiencia
    prepostoId: string
    parceiroId: string
    importacaoId?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AudienciaUpdateWithoutTrtInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preposto?: PrepostoUpdateOneRequiredWithoutAudienciasNestedInput
    parceiro?: ParceiroUpdateOneRequiredWithoutAudienciasNestedInput
    importacao?: ImportacaoUpdateOneWithoutAudienciasNestedInput
    mensagens?: MensagemUpdateManyWithoutAudienciaNestedInput
    historicoStatus?: HistoricoStatusUpdateManyWithoutAudienciaNestedInput
    relatorio?: RelatorioAudienciaUpdateOneWithoutAudienciaNestedInput
    substituicoes?: SubstituicaoUpdateManyWithoutAudienciaNestedInput
  }

  export type AudienciaUncheckedUpdateWithoutTrtInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    prepostoId?: StringFieldUpdateOperationsInput | string
    parceiroId?: StringFieldUpdateOperationsInput | string
    importacaoId?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mensagens?: MensagemUncheckedUpdateManyWithoutAudienciaNestedInput
    historicoStatus?: HistoricoStatusUncheckedUpdateManyWithoutAudienciaNestedInput
    relatorio?: RelatorioAudienciaUncheckedUpdateOneWithoutAudienciaNestedInput
    substituicoes?: SubstituicaoUncheckedUpdateManyWithoutAudienciaNestedInput
  }

  export type AudienciaUncheckedUpdateManyWithoutTrtInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    prepostoId?: StringFieldUpdateOperationsInput | string
    parceiroId?: StringFieldUpdateOperationsInput | string
    importacaoId?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AudienciaCreateManyPrepostoInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    trtId: string
    vara?: string | null
    status?: $Enums.StatusAudiencia
    parceiroId: string
    importacaoId?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MensagemCreateManyPrepostoInput = {
    id?: string
    audienciaId: string
    contatoParceiroId?: string | null
    tipo: $Enums.TipoMensagem
    direcao: $Enums.DirecaoMensagem
    conteudo: string
    respostaBotao?: string | null
    observacao?: string | null
    whatsappMessageId?: string | null
    statusEnvio?: $Enums.StatusEnvioMensagem
    createdAt?: Date | string
  }

  export type SubstituicaoCreateManyPrepostoAnteriorInput = {
    id?: string
    audienciaId: string
    prepostoNovoId?: string | null
    motivo: string
    status?: $Enums.StatusSubstituicao
    createdAt?: Date | string
    resolvidoEm?: Date | string | null
  }

  export type SubstituicaoCreateManyPrepostoNovoInput = {
    id?: string
    audienciaId: string
    prepostoAnteriorId: string
    motivo: string
    status?: $Enums.StatusSubstituicao
    createdAt?: Date | string
    resolvidoEm?: Date | string | null
  }

  export type AudienciaUpdateWithoutPrepostoInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trt?: TrtUpdateOneRequiredWithoutAudienciasNestedInput
    parceiro?: ParceiroUpdateOneRequiredWithoutAudienciasNestedInput
    importacao?: ImportacaoUpdateOneWithoutAudienciasNestedInput
    mensagens?: MensagemUpdateManyWithoutAudienciaNestedInput
    historicoStatus?: HistoricoStatusUpdateManyWithoutAudienciaNestedInput
    relatorio?: RelatorioAudienciaUpdateOneWithoutAudienciaNestedInput
    substituicoes?: SubstituicaoUpdateManyWithoutAudienciaNestedInput
  }

  export type AudienciaUncheckedUpdateWithoutPrepostoInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    trtId?: StringFieldUpdateOperationsInput | string
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    parceiroId?: StringFieldUpdateOperationsInput | string
    importacaoId?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mensagens?: MensagemUncheckedUpdateManyWithoutAudienciaNestedInput
    historicoStatus?: HistoricoStatusUncheckedUpdateManyWithoutAudienciaNestedInput
    relatorio?: RelatorioAudienciaUncheckedUpdateOneWithoutAudienciaNestedInput
    substituicoes?: SubstituicaoUncheckedUpdateManyWithoutAudienciaNestedInput
  }

  export type AudienciaUncheckedUpdateManyWithoutPrepostoInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    trtId?: StringFieldUpdateOperationsInput | string
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    parceiroId?: StringFieldUpdateOperationsInput | string
    importacaoId?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MensagemUpdateWithoutPrepostoInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoMensagemFieldUpdateOperationsInput | $Enums.TipoMensagem
    direcao?: EnumDirecaoMensagemFieldUpdateOperationsInput | $Enums.DirecaoMensagem
    conteudo?: StringFieldUpdateOperationsInput | string
    respostaBotao?: NullableStringFieldUpdateOperationsInput | string | null
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    statusEnvio?: EnumStatusEnvioMensagemFieldUpdateOperationsInput | $Enums.StatusEnvioMensagem
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    audiencia?: AudienciaUpdateOneRequiredWithoutMensagensNestedInput
    contatoParceiro?: ContatoParceiroUpdateOneWithoutMensagensNestedInput
  }

  export type MensagemUncheckedUpdateWithoutPrepostoInput = {
    id?: StringFieldUpdateOperationsInput | string
    audienciaId?: StringFieldUpdateOperationsInput | string
    contatoParceiroId?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoMensagemFieldUpdateOperationsInput | $Enums.TipoMensagem
    direcao?: EnumDirecaoMensagemFieldUpdateOperationsInput | $Enums.DirecaoMensagem
    conteudo?: StringFieldUpdateOperationsInput | string
    respostaBotao?: NullableStringFieldUpdateOperationsInput | string | null
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    statusEnvio?: EnumStatusEnvioMensagemFieldUpdateOperationsInput | $Enums.StatusEnvioMensagem
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MensagemUncheckedUpdateManyWithoutPrepostoInput = {
    id?: StringFieldUpdateOperationsInput | string
    audienciaId?: StringFieldUpdateOperationsInput | string
    contatoParceiroId?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoMensagemFieldUpdateOperationsInput | $Enums.TipoMensagem
    direcao?: EnumDirecaoMensagemFieldUpdateOperationsInput | $Enums.DirecaoMensagem
    conteudo?: StringFieldUpdateOperationsInput | string
    respostaBotao?: NullableStringFieldUpdateOperationsInput | string | null
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    statusEnvio?: EnumStatusEnvioMensagemFieldUpdateOperationsInput | $Enums.StatusEnvioMensagem
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubstituicaoUpdateWithoutPrepostoAnteriorInput = {
    id?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusSubstituicaoFieldUpdateOperationsInput | $Enums.StatusSubstituicao
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    audiencia?: AudienciaUpdateOneRequiredWithoutSubstituicoesNestedInput
    prepostoNovo?: PrepostoUpdateOneWithoutSubstituicoesNovoNestedInput
  }

  export type SubstituicaoUncheckedUpdateWithoutPrepostoAnteriorInput = {
    id?: StringFieldUpdateOperationsInput | string
    audienciaId?: StringFieldUpdateOperationsInput | string
    prepostoNovoId?: NullableStringFieldUpdateOperationsInput | string | null
    motivo?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusSubstituicaoFieldUpdateOperationsInput | $Enums.StatusSubstituicao
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SubstituicaoUncheckedUpdateManyWithoutPrepostoAnteriorInput = {
    id?: StringFieldUpdateOperationsInput | string
    audienciaId?: StringFieldUpdateOperationsInput | string
    prepostoNovoId?: NullableStringFieldUpdateOperationsInput | string | null
    motivo?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusSubstituicaoFieldUpdateOperationsInput | $Enums.StatusSubstituicao
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SubstituicaoUpdateWithoutPrepostoNovoInput = {
    id?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusSubstituicaoFieldUpdateOperationsInput | $Enums.StatusSubstituicao
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    audiencia?: AudienciaUpdateOneRequiredWithoutSubstituicoesNestedInput
    prepostoAnterior?: PrepostoUpdateOneRequiredWithoutSubstituicoesAnteriorNestedInput
  }

  export type SubstituicaoUncheckedUpdateWithoutPrepostoNovoInput = {
    id?: StringFieldUpdateOperationsInput | string
    audienciaId?: StringFieldUpdateOperationsInput | string
    prepostoAnteriorId?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusSubstituicaoFieldUpdateOperationsInput | $Enums.StatusSubstituicao
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SubstituicaoUncheckedUpdateManyWithoutPrepostoNovoInput = {
    id?: StringFieldUpdateOperationsInput | string
    audienciaId?: StringFieldUpdateOperationsInput | string
    prepostoAnteriorId?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusSubstituicaoFieldUpdateOperationsInput | $Enums.StatusSubstituicao
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ContatoParceiroCreateManyParceiroInput = {
    id?: string
    nome: string
    telefoneWhatsapp: string
    email?: string | null
    cargo?: string | null
    ordemEscalonamento?: number
    createdAt?: Date | string
  }

  export type AudienciaCreateManyParceiroInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    trtId: string
    vara?: string | null
    status?: $Enums.StatusAudiencia
    prepostoId: string
    importacaoId?: string | null
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContatoParceiroUpdateWithoutParceiroInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    ordemEscalonamento?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mensagens?: MensagemUpdateManyWithoutContatoParceiroNestedInput
  }

  export type ContatoParceiroUncheckedUpdateWithoutParceiroInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    ordemEscalonamento?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mensagens?: MensagemUncheckedUpdateManyWithoutContatoParceiroNestedInput
  }

  export type ContatoParceiroUncheckedUpdateManyWithoutParceiroInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    telefoneWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    ordemEscalonamento?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AudienciaUpdateWithoutParceiroInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trt?: TrtUpdateOneRequiredWithoutAudienciasNestedInput
    preposto?: PrepostoUpdateOneRequiredWithoutAudienciasNestedInput
    importacao?: ImportacaoUpdateOneWithoutAudienciasNestedInput
    mensagens?: MensagemUpdateManyWithoutAudienciaNestedInput
    historicoStatus?: HistoricoStatusUpdateManyWithoutAudienciaNestedInput
    relatorio?: RelatorioAudienciaUpdateOneWithoutAudienciaNestedInput
    substituicoes?: SubstituicaoUpdateManyWithoutAudienciaNestedInput
  }

  export type AudienciaUncheckedUpdateWithoutParceiroInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    trtId?: StringFieldUpdateOperationsInput | string
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    prepostoId?: StringFieldUpdateOperationsInput | string
    importacaoId?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mensagens?: MensagemUncheckedUpdateManyWithoutAudienciaNestedInput
    historicoStatus?: HistoricoStatusUncheckedUpdateManyWithoutAudienciaNestedInput
    relatorio?: RelatorioAudienciaUncheckedUpdateOneWithoutAudienciaNestedInput
    substituicoes?: SubstituicaoUncheckedUpdateManyWithoutAudienciaNestedInput
  }

  export type AudienciaUncheckedUpdateManyWithoutParceiroInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    trtId?: StringFieldUpdateOperationsInput | string
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    prepostoId?: StringFieldUpdateOperationsInput | string
    importacaoId?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MensagemCreateManyContatoParceiroInput = {
    id?: string
    audienciaId: string
    prepostoId?: string | null
    tipo: $Enums.TipoMensagem
    direcao: $Enums.DirecaoMensagem
    conteudo: string
    respostaBotao?: string | null
    observacao?: string | null
    whatsappMessageId?: string | null
    statusEnvio?: $Enums.StatusEnvioMensagem
    createdAt?: Date | string
  }

  export type MensagemUpdateWithoutContatoParceiroInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoMensagemFieldUpdateOperationsInput | $Enums.TipoMensagem
    direcao?: EnumDirecaoMensagemFieldUpdateOperationsInput | $Enums.DirecaoMensagem
    conteudo?: StringFieldUpdateOperationsInput | string
    respostaBotao?: NullableStringFieldUpdateOperationsInput | string | null
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    statusEnvio?: EnumStatusEnvioMensagemFieldUpdateOperationsInput | $Enums.StatusEnvioMensagem
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    audiencia?: AudienciaUpdateOneRequiredWithoutMensagensNestedInput
    preposto?: PrepostoUpdateOneWithoutMensagensNestedInput
  }

  export type MensagemUncheckedUpdateWithoutContatoParceiroInput = {
    id?: StringFieldUpdateOperationsInput | string
    audienciaId?: StringFieldUpdateOperationsInput | string
    prepostoId?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoMensagemFieldUpdateOperationsInput | $Enums.TipoMensagem
    direcao?: EnumDirecaoMensagemFieldUpdateOperationsInput | $Enums.DirecaoMensagem
    conteudo?: StringFieldUpdateOperationsInput | string
    respostaBotao?: NullableStringFieldUpdateOperationsInput | string | null
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    statusEnvio?: EnumStatusEnvioMensagemFieldUpdateOperationsInput | $Enums.StatusEnvioMensagem
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MensagemUncheckedUpdateManyWithoutContatoParceiroInput = {
    id?: StringFieldUpdateOperationsInput | string
    audienciaId?: StringFieldUpdateOperationsInput | string
    prepostoId?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoMensagemFieldUpdateOperationsInput | $Enums.TipoMensagem
    direcao?: EnumDirecaoMensagemFieldUpdateOperationsInput | $Enums.DirecaoMensagem
    conteudo?: StringFieldUpdateOperationsInput | string
    respostaBotao?: NullableStringFieldUpdateOperationsInput | string | null
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    statusEnvio?: EnumStatusEnvioMensagemFieldUpdateOperationsInput | $Enums.StatusEnvioMensagem
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AudienciaCreateManyImportacaoInput = {
    id?: string
    numeroProcesso: string
    reclamante?: string | null
    data: Date | string
    hora: string
    modalidade: $Enums.Modalidade
    local?: string | null
    link?: string | null
    trtId: string
    vara?: string | null
    status?: $Enums.StatusAudiencia
    prepostoId: string
    parceiroId: string
    observacoes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AudienciaUpdateWithoutImportacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trt?: TrtUpdateOneRequiredWithoutAudienciasNestedInput
    preposto?: PrepostoUpdateOneRequiredWithoutAudienciasNestedInput
    parceiro?: ParceiroUpdateOneRequiredWithoutAudienciasNestedInput
    mensagens?: MensagemUpdateManyWithoutAudienciaNestedInput
    historicoStatus?: HistoricoStatusUpdateManyWithoutAudienciaNestedInput
    relatorio?: RelatorioAudienciaUpdateOneWithoutAudienciaNestedInput
    substituicoes?: SubstituicaoUpdateManyWithoutAudienciaNestedInput
  }

  export type AudienciaUncheckedUpdateWithoutImportacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    trtId?: StringFieldUpdateOperationsInput | string
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    prepostoId?: StringFieldUpdateOperationsInput | string
    parceiroId?: StringFieldUpdateOperationsInput | string
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mensagens?: MensagemUncheckedUpdateManyWithoutAudienciaNestedInput
    historicoStatus?: HistoricoStatusUncheckedUpdateManyWithoutAudienciaNestedInput
    relatorio?: RelatorioAudienciaUncheckedUpdateOneWithoutAudienciaNestedInput
    substituicoes?: SubstituicaoUncheckedUpdateManyWithoutAudienciaNestedInput
  }

  export type AudienciaUncheckedUpdateManyWithoutImportacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroProcesso?: StringFieldUpdateOperationsInput | string
    reclamante?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    hora?: StringFieldUpdateOperationsInput | string
    modalidade?: EnumModalidadeFieldUpdateOperationsInput | $Enums.Modalidade
    local?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    trtId?: StringFieldUpdateOperationsInput | string
    vara?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    prepostoId?: StringFieldUpdateOperationsInput | string
    parceiroId?: StringFieldUpdateOperationsInput | string
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MensagemCreateManyAudienciaInput = {
    id?: string
    prepostoId?: string | null
    contatoParceiroId?: string | null
    tipo: $Enums.TipoMensagem
    direcao: $Enums.DirecaoMensagem
    conteudo: string
    respostaBotao?: string | null
    observacao?: string | null
    whatsappMessageId?: string | null
    statusEnvio?: $Enums.StatusEnvioMensagem
    createdAt?: Date | string
  }

  export type HistoricoStatusCreateManyAudienciaInput = {
    id?: string
    statusAnterior: $Enums.StatusAudiencia
    statusNovo: $Enums.StatusAudiencia
    motivo?: string | null
    atualizadoPor: string
    createdAt?: Date | string
  }

  export type SubstituicaoCreateManyAudienciaInput = {
    id?: string
    prepostoAnteriorId: string
    prepostoNovoId?: string | null
    motivo: string
    status?: $Enums.StatusSubstituicao
    createdAt?: Date | string
    resolvidoEm?: Date | string | null
  }

  export type MensagemUpdateWithoutAudienciaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoMensagemFieldUpdateOperationsInput | $Enums.TipoMensagem
    direcao?: EnumDirecaoMensagemFieldUpdateOperationsInput | $Enums.DirecaoMensagem
    conteudo?: StringFieldUpdateOperationsInput | string
    respostaBotao?: NullableStringFieldUpdateOperationsInput | string | null
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    statusEnvio?: EnumStatusEnvioMensagemFieldUpdateOperationsInput | $Enums.StatusEnvioMensagem
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preposto?: PrepostoUpdateOneWithoutMensagensNestedInput
    contatoParceiro?: ContatoParceiroUpdateOneWithoutMensagensNestedInput
  }

  export type MensagemUncheckedUpdateWithoutAudienciaInput = {
    id?: StringFieldUpdateOperationsInput | string
    prepostoId?: NullableStringFieldUpdateOperationsInput | string | null
    contatoParceiroId?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoMensagemFieldUpdateOperationsInput | $Enums.TipoMensagem
    direcao?: EnumDirecaoMensagemFieldUpdateOperationsInput | $Enums.DirecaoMensagem
    conteudo?: StringFieldUpdateOperationsInput | string
    respostaBotao?: NullableStringFieldUpdateOperationsInput | string | null
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    statusEnvio?: EnumStatusEnvioMensagemFieldUpdateOperationsInput | $Enums.StatusEnvioMensagem
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MensagemUncheckedUpdateManyWithoutAudienciaInput = {
    id?: StringFieldUpdateOperationsInput | string
    prepostoId?: NullableStringFieldUpdateOperationsInput | string | null
    contatoParceiroId?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: EnumTipoMensagemFieldUpdateOperationsInput | $Enums.TipoMensagem
    direcao?: EnumDirecaoMensagemFieldUpdateOperationsInput | $Enums.DirecaoMensagem
    conteudo?: StringFieldUpdateOperationsInput | string
    respostaBotao?: NullableStringFieldUpdateOperationsInput | string | null
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    statusEnvio?: EnumStatusEnvioMensagemFieldUpdateOperationsInput | $Enums.StatusEnvioMensagem
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HistoricoStatusUpdateWithoutAudienciaInput = {
    id?: StringFieldUpdateOperationsInput | string
    statusAnterior?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    statusNovo?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    motivo?: NullableStringFieldUpdateOperationsInput | string | null
    atualizadoPor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HistoricoStatusUncheckedUpdateWithoutAudienciaInput = {
    id?: StringFieldUpdateOperationsInput | string
    statusAnterior?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    statusNovo?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    motivo?: NullableStringFieldUpdateOperationsInput | string | null
    atualizadoPor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HistoricoStatusUncheckedUpdateManyWithoutAudienciaInput = {
    id?: StringFieldUpdateOperationsInput | string
    statusAnterior?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    statusNovo?: EnumStatusAudienciaFieldUpdateOperationsInput | $Enums.StatusAudiencia
    motivo?: NullableStringFieldUpdateOperationsInput | string | null
    atualizadoPor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubstituicaoUpdateWithoutAudienciaInput = {
    id?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusSubstituicaoFieldUpdateOperationsInput | $Enums.StatusSubstituicao
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prepostoAnterior?: PrepostoUpdateOneRequiredWithoutSubstituicoesAnteriorNestedInput
    prepostoNovo?: PrepostoUpdateOneWithoutSubstituicoesNovoNestedInput
  }

  export type SubstituicaoUncheckedUpdateWithoutAudienciaInput = {
    id?: StringFieldUpdateOperationsInput | string
    prepostoAnteriorId?: StringFieldUpdateOperationsInput | string
    prepostoNovoId?: NullableStringFieldUpdateOperationsInput | string | null
    motivo?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusSubstituicaoFieldUpdateOperationsInput | $Enums.StatusSubstituicao
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SubstituicaoUncheckedUpdateManyWithoutAudienciaInput = {
    id?: StringFieldUpdateOperationsInput | string
    prepostoAnteriorId?: StringFieldUpdateOperationsInput | string
    prepostoNovoId?: NullableStringFieldUpdateOperationsInput | string | null
    motivo?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusSubstituicaoFieldUpdateOperationsInput | $Enums.StatusSubstituicao
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
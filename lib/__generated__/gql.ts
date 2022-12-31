import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A signed eight-byte integer. The upper big integer values are greater than the
   * max value for a JavaScript number. Therefore all big integers will be output as
   * strings and not numbers.
   */
  BigInt: any;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /** The day, does not include a time. */
  Date: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
};

export type AccSaberScore = {
  __typename?: 'AccSaberScore';
  accuracy?: Maybe<Scalars['Float']>;
  ap?: Maybe<Scalars['Float']>;
  beatSaverKey?: Maybe<Scalars['String']>;
  categoryDisplayName?: Maybe<Scalars['String']>;
  categoryName?: Maybe<Scalars['String']>;
  complexity?: Maybe<Scalars['Float']>;
  difficulty?: Maybe<Scalars['String']>;
  isRankedScore?: Maybe<Scalars['Boolean']>;
  leaderboardId?: Maybe<Scalars['BigInt']>;
  levelAuthorName?: Maybe<Scalars['String']>;
  mods?: Maybe<Scalars['String']>;
  playerId?: Maybe<Scalars['BigInt']>;
  rankWhenScoresSet?: Maybe<Scalars['Int']>;
  ranking?: Maybe<Scalars['BigInt']>;
  score?: Maybe<Scalars['Int']>;
  scoreId?: Maybe<Scalars['BigInt']>;
  songAuthorName?: Maybe<Scalars['String']>;
  songHash?: Maybe<Scalars['String']>;
  songName?: Maybe<Scalars['String']>;
  songSubName?: Maybe<Scalars['String']>;
  timeSet?: Maybe<Scalars['Datetime']>;
  unmodififiedScore?: Maybe<Scalars['Int']>;
  weightedAp?: Maybe<Scalars['Float']>;
};

/**
 * A condition to be used against `AccSaberScore` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type AccSaberScoreCondition = {
  /** Checks for equality with the object’s `accuracy` field. */
  accuracy?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `ap` field. */
  ap?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `beatSaverKey` field. */
  beatSaverKey?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `categoryDisplayName` field. */
  categoryDisplayName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `categoryName` field. */
  categoryName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `complexity` field. */
  complexity?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `difficulty` field. */
  difficulty?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `isRankedScore` field. */
  isRankedScore?: InputMaybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `leaderboardId` field. */
  leaderboardId?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `levelAuthorName` field. */
  levelAuthorName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `mods` field. */
  mods?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `playerId` field. */
  playerId?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `rankWhenScoresSet` field. */
  rankWhenScoresSet?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `ranking` field. */
  ranking?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `score` field. */
  score?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `scoreId` field. */
  scoreId?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `songAuthorName` field. */
  songAuthorName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `songHash` field. */
  songHash?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `songName` field. */
  songName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `songSubName` field. */
  songSubName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `timeSet` field. */
  timeSet?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `unmodififiedScore` field. */
  unmodififiedScore?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `weightedAp` field. */
  weightedAp?: InputMaybe<Scalars['Float']>;
};

/** A connection to a list of `AccSaberScore` values. */
export type AccSaberScoresConnection = {
  __typename?: 'AccSaberScoresConnection';
  /** A list of edges which contains the `AccSaberScore` and cursor to aid in pagination. */
  edges: Array<AccSaberScoresEdge>;
  /** A list of `AccSaberScore` objects. */
  nodes: Array<AccSaberScore>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AccSaberScore` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `AccSaberScore` edge in the connection. */
export type AccSaberScoresEdge = {
  __typename?: 'AccSaberScoresEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `AccSaberScore` at the end of the edge. */
  node: AccSaberScore;
};

/** Methods to use when ordering `AccSaberScore`. */
export enum AccSaberScoresOrderBy {
  AccuracyAsc = 'ACCURACY_ASC',
  AccuracyDesc = 'ACCURACY_DESC',
  ApAsc = 'AP_ASC',
  ApDesc = 'AP_DESC',
  BeatSaverKeyAsc = 'BEAT_SAVER_KEY_ASC',
  BeatSaverKeyDesc = 'BEAT_SAVER_KEY_DESC',
  CategoryDisplayNameAsc = 'CATEGORY_DISPLAY_NAME_ASC',
  CategoryDisplayNameDesc = 'CATEGORY_DISPLAY_NAME_DESC',
  CategoryNameAsc = 'CATEGORY_NAME_ASC',
  CategoryNameDesc = 'CATEGORY_NAME_DESC',
  ComplexityAsc = 'COMPLEXITY_ASC',
  ComplexityDesc = 'COMPLEXITY_DESC',
  DifficultyAsc = 'DIFFICULTY_ASC',
  DifficultyDesc = 'DIFFICULTY_DESC',
  IsRankedScoreAsc = 'IS_RANKED_SCORE_ASC',
  IsRankedScoreDesc = 'IS_RANKED_SCORE_DESC',
  LeaderboardIdAsc = 'LEADERBOARD_ID_ASC',
  LeaderboardIdDesc = 'LEADERBOARD_ID_DESC',
  LevelAuthorNameAsc = 'LEVEL_AUTHOR_NAME_ASC',
  LevelAuthorNameDesc = 'LEVEL_AUTHOR_NAME_DESC',
  ModsAsc = 'MODS_ASC',
  ModsDesc = 'MODS_DESC',
  Natural = 'NATURAL',
  PlayerIdAsc = 'PLAYER_ID_ASC',
  PlayerIdDesc = 'PLAYER_ID_DESC',
  RankingAsc = 'RANKING_ASC',
  RankingDesc = 'RANKING_DESC',
  RankWhenScoresSetAsc = 'RANK_WHEN_SCORES_SET_ASC',
  RankWhenScoresSetDesc = 'RANK_WHEN_SCORES_SET_DESC',
  ScoreAsc = 'SCORE_ASC',
  ScoreDesc = 'SCORE_DESC',
  ScoreIdAsc = 'SCORE_ID_ASC',
  ScoreIdDesc = 'SCORE_ID_DESC',
  SongAuthorNameAsc = 'SONG_AUTHOR_NAME_ASC',
  SongAuthorNameDesc = 'SONG_AUTHOR_NAME_DESC',
  SongHashAsc = 'SONG_HASH_ASC',
  SongHashDesc = 'SONG_HASH_DESC',
  SongNameAsc = 'SONG_NAME_ASC',
  SongNameDesc = 'SONG_NAME_DESC',
  SongSubNameAsc = 'SONG_SUB_NAME_ASC',
  SongSubNameDesc = 'SONG_SUB_NAME_DESC',
  TimeSetAsc = 'TIME_SET_ASC',
  TimeSetDesc = 'TIME_SET_DESC',
  UnmodififiedScoreAsc = 'UNMODIFIFIED_SCORE_ASC',
  UnmodififiedScoreDesc = 'UNMODIFIFIED_SCORE_DESC',
  WeightedApAsc = 'WEIGHTED_AP_ASC',
  WeightedApDesc = 'WEIGHTED_AP_DESC'
}

export type BeatMap = Node & {
  __typename?: 'BeatMap';
  /** Reads a single `Category` that is related to this `BeatMap`. */
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['BigInt']>;
  complexity: Scalars['Float'];
  dateRanked: Scalars['Datetime'];
  difficulty?: Maybe<Scalars['String']>;
  leaderboardId: Scalars['BigInt'];
  maxScore: Scalars['Int'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  song?: Maybe<Scalars['String']>;
  /** Reads a single `Song` that is related to this `BeatMap`. */
  songBySong?: Maybe<Song>;
};

/** A condition to be used against `BeatMap` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type BeatMapCondition = {
  /** Checks for equality with the object’s `categoryId` field. */
  categoryId?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `complexity` field. */
  complexity?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `dateRanked` field. */
  dateRanked?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `difficulty` field. */
  difficulty?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `leaderboardId` field. */
  leaderboardId?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `maxScore` field. */
  maxScore?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `song` field. */
  song?: InputMaybe<Scalars['String']>;
};

/** An input for mutations affecting `BeatMap` */
export type BeatMapInput = {
  categoryId?: InputMaybe<Scalars['BigInt']>;
  complexity: Scalars['Float'];
  dateRanked: Scalars['Datetime'];
  difficulty?: InputMaybe<Scalars['String']>;
  leaderboardId: Scalars['BigInt'];
  maxScore: Scalars['Int'];
  song?: InputMaybe<Scalars['String']>;
};

/** Represents an update to a `BeatMap`. Fields that are set will be updated. */
export type BeatMapPatch = {
  categoryId?: InputMaybe<Scalars['BigInt']>;
  complexity?: InputMaybe<Scalars['Float']>;
  dateRanked?: InputMaybe<Scalars['Datetime']>;
  difficulty?: InputMaybe<Scalars['String']>;
  leaderboardId?: InputMaybe<Scalars['BigInt']>;
  maxScore?: InputMaybe<Scalars['Int']>;
  song?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of `BeatMap` values. */
export type BeatMapsConnection = {
  __typename?: 'BeatMapsConnection';
  /** A list of edges which contains the `BeatMap` and cursor to aid in pagination. */
  edges: Array<BeatMapsEdge>;
  /** A list of `BeatMap` objects. */
  nodes: Array<BeatMap>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `BeatMap` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `BeatMap` edge in the connection. */
export type BeatMapsEdge = {
  __typename?: 'BeatMapsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `BeatMap` at the end of the edge. */
  node: BeatMap;
};

/** Methods to use when ordering `BeatMap`. */
export enum BeatMapsOrderBy {
  CategoryIdAsc = 'CATEGORY_ID_ASC',
  CategoryIdDesc = 'CATEGORY_ID_DESC',
  ComplexityAsc = 'COMPLEXITY_ASC',
  ComplexityDesc = 'COMPLEXITY_DESC',
  DateRankedAsc = 'DATE_RANKED_ASC',
  DateRankedDesc = 'DATE_RANKED_DESC',
  DifficultyAsc = 'DIFFICULTY_ASC',
  DifficultyDesc = 'DIFFICULTY_DESC',
  LeaderboardIdAsc = 'LEADERBOARD_ID_ASC',
  LeaderboardIdDesc = 'LEADERBOARD_ID_DESC',
  MaxScoreAsc = 'MAX_SCORE_ASC',
  MaxScoreDesc = 'MAX_SCORE_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SongAsc = 'SONG_ASC',
  SongDesc = 'SONG_DESC'
}

/** All input for the `calcAp` mutation. */
export type CalcApInput = {
  accuracy?: InputMaybe<Scalars['Float']>;
  categoryId?: InputMaybe<Scalars['BigInt']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  complexity?: InputMaybe<Scalars['Float']>;
};

/** The output of our `calcAp` mutation. */
export type CalcApPayload = {
  __typename?: 'CalcApPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  float?: Maybe<Scalars['Float']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `calcWeightedAp` mutation. */
export type CalcWeightedApInput = {
  ap?: InputMaybe<Scalars['Float']>;
  categoryId?: InputMaybe<Scalars['BigInt']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  ranking?: InputMaybe<Scalars['BigInt']>;
};

/** The output of our `calcWeightedAp` mutation. */
export type CalcWeightedApPayload = {
  __typename?: 'CalcWeightedApPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  float?: Maybe<Scalars['Float']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** A connection to a list of `Category` values. */
export type CategoriesConnection = {
  __typename?: 'CategoriesConnection';
  /** A list of edges which contains the `Category` and cursor to aid in pagination. */
  edges: Array<CategoriesEdge>;
  /** A list of `Category` objects. */
  nodes: Array<Category>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Category` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Category` edge in the connection. */
export type CategoriesEdge = {
  __typename?: 'CategoriesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Category` at the end of the edge. */
  node: Category;
};

/** Methods to use when ordering `Category`. */
export enum CategoriesOrderBy {
  ApCurveAAsc = 'AP_CURVE_A_ASC',
  ApCurveADesc = 'AP_CURVE_A_DESC',
  ApCurveBAsc = 'AP_CURVE_B_ASC',
  ApCurveBDesc = 'AP_CURVE_B_DESC',
  ApCurveCAsc = 'AP_CURVE_C_ASC',
  ApCurveCDesc = 'AP_CURVE_C_DESC',
  ApCurveDAsc = 'AP_CURVE_D_ASC',
  ApCurveDDesc = 'AP_CURVE_D_DESC',
  ApCurveEAsc = 'AP_CURVE_E_ASC',
  ApCurveEDesc = 'AP_CURVE_E_DESC',
  CategoryDisplayNameAsc = 'CATEGORY_DISPLAY_NAME_ASC',
  CategoryDisplayNameDesc = 'CATEGORY_DISPLAY_NAME_DESC',
  CategoryNameAsc = 'CATEGORY_NAME_ASC',
  CategoryNameDesc = 'CATEGORY_NAME_DESC',
  CountsTowardsOverallAsc = 'COUNTS_TOWARDS_OVERALL_ASC',
  CountsTowardsOverallDesc = 'COUNTS_TOWARDS_OVERALL_DESC',
  CreatedDateAsc = 'CREATED_DATE_ASC',
  CreatedDateDesc = 'CREATED_DATE_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PlayerCurveKAsc = 'PLAYER_CURVE_K_ASC',
  PlayerCurveKDesc = 'PLAYER_CURVE_K_DESC',
  PlayerCurveX1Asc = 'PLAYER_CURVE_X1_ASC',
  PlayerCurveX1Desc = 'PLAYER_CURVE_X1_DESC',
  PlayerCurveY1Asc = 'PLAYER_CURVE_Y1_ASC',
  PlayerCurveY1Desc = 'PLAYER_CURVE_Y1_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Category = Node & {
  __typename?: 'Category';
  apCurveA?: Maybe<Scalars['Float']>;
  apCurveB?: Maybe<Scalars['Float']>;
  apCurveC?: Maybe<Scalars['Float']>;
  apCurveD?: Maybe<Scalars['Float']>;
  apCurveE?: Maybe<Scalars['Float']>;
  /** Reads and enables pagination through a set of `BeatMap`. */
  beatMaps: BeatMapsConnection;
  categoryDisplayName?: Maybe<Scalars['String']>;
  categoryName: Scalars['String'];
  countsTowardsOverall: Scalars['Boolean'];
  createdDate: Scalars['Datetime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads and enables pagination through a set of `PlayerCategoryStat`. */
  playerCategoryStats: PlayerCategoryStatsConnection;
  playerCurveK?: Maybe<Scalars['Float']>;
  playerCurveX1?: Maybe<Scalars['Float']>;
  playerCurveY1?: Maybe<Scalars['Float']>;
};


export type CategoryBeatMapsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<BeatMapCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BeatMapsOrderBy>>;
};


export type CategoryPlayerCategoryStatsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<PlayerCategoryStatCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PlayerCategoryStatsOrderBy>>;
};

export type CategoryAccSaberPlayer = {
  __typename?: 'CategoryAccSaberPlayer';
  ap?: Maybe<Scalars['Float']>;
  avatarUrl?: Maybe<Scalars['String']>;
  averageAcc?: Maybe<Scalars['Float']>;
  averageApPerMap?: Maybe<Scalars['Float']>;
  categoryName?: Maybe<Scalars['String']>;
  hmd?: Maybe<Scalars['String']>;
  isAccChamp?: Maybe<Scalars['Boolean']>;
  playerId?: Maybe<Scalars['BigInt']>;
  playerName?: Maybe<Scalars['String']>;
  rankedPlays?: Maybe<Scalars['Int']>;
  ranking?: Maybe<Scalars['BigInt']>;
  rankingLastWeek?: Maybe<Scalars['Int']>;
};

/**
 * A condition to be used against `CategoryAccSaberPlayer` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type CategoryAccSaberPlayerCondition = {
  /** Checks for equality with the object’s `ap` field. */
  ap?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `avatarUrl` field. */
  avatarUrl?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `averageAcc` field. */
  averageAcc?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `averageApPerMap` field. */
  averageApPerMap?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `categoryName` field. */
  categoryName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `hmd` field. */
  hmd?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `isAccChamp` field. */
  isAccChamp?: InputMaybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `playerId` field. */
  playerId?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `playerName` field. */
  playerName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `rankedPlays` field. */
  rankedPlays?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `ranking` field. */
  ranking?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `rankingLastWeek` field. */
  rankingLastWeek?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of `CategoryAccSaberPlayer` values. */
export type CategoryAccSaberPlayersConnection = {
  __typename?: 'CategoryAccSaberPlayersConnection';
  /** A list of edges which contains the `CategoryAccSaberPlayer` and cursor to aid in pagination. */
  edges: Array<CategoryAccSaberPlayersEdge>;
  /** A list of `CategoryAccSaberPlayer` objects. */
  nodes: Array<CategoryAccSaberPlayer>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CategoryAccSaberPlayer` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CategoryAccSaberPlayer` edge in the connection. */
export type CategoryAccSaberPlayersEdge = {
  __typename?: 'CategoryAccSaberPlayersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CategoryAccSaberPlayer` at the end of the edge. */
  node: CategoryAccSaberPlayer;
};

/** Methods to use when ordering `CategoryAccSaberPlayer`. */
export enum CategoryAccSaberPlayersOrderBy {
  ApAsc = 'AP_ASC',
  ApDesc = 'AP_DESC',
  AvatarUrlAsc = 'AVATAR_URL_ASC',
  AvatarUrlDesc = 'AVATAR_URL_DESC',
  AverageAccAsc = 'AVERAGE_ACC_ASC',
  AverageAccDesc = 'AVERAGE_ACC_DESC',
  AverageApPerMapAsc = 'AVERAGE_AP_PER_MAP_ASC',
  AverageApPerMapDesc = 'AVERAGE_AP_PER_MAP_DESC',
  CategoryNameAsc = 'CATEGORY_NAME_ASC',
  CategoryNameDesc = 'CATEGORY_NAME_DESC',
  HmdAsc = 'HMD_ASC',
  HmdDesc = 'HMD_DESC',
  IsAccChampAsc = 'IS_ACC_CHAMP_ASC',
  IsAccChampDesc = 'IS_ACC_CHAMP_DESC',
  Natural = 'NATURAL',
  PlayerIdAsc = 'PLAYER_ID_ASC',
  PlayerIdDesc = 'PLAYER_ID_DESC',
  PlayerNameAsc = 'PLAYER_NAME_ASC',
  PlayerNameDesc = 'PLAYER_NAME_DESC',
  RankedPlaysAsc = 'RANKED_PLAYS_ASC',
  RankedPlaysDesc = 'RANKED_PLAYS_DESC',
  RankingAsc = 'RANKING_ASC',
  RankingDesc = 'RANKING_DESC',
  RankingLastWeekAsc = 'RANKING_LAST_WEEK_ASC',
  RankingLastWeekDesc = 'RANKING_LAST_WEEK_DESC'
}

/**
 * A condition to be used against `Category` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type CategoryCondition = {
  /** Checks for equality with the object’s `apCurveA` field. */
  apCurveA?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `apCurveB` field. */
  apCurveB?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `apCurveC` field. */
  apCurveC?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `apCurveD` field. */
  apCurveD?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `apCurveE` field. */
  apCurveE?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `categoryDisplayName` field. */
  categoryDisplayName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `categoryName` field. */
  categoryName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `countsTowardsOverall` field. */
  countsTowardsOverall?: InputMaybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `playerCurveK` field. */
  playerCurveK?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `playerCurveX1` field. */
  playerCurveX1?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `playerCurveY1` field. */
  playerCurveY1?: InputMaybe<Scalars['Float']>;
};

/** An input for mutations affecting `Category` */
export type CategoryInput = {
  apCurveA?: InputMaybe<Scalars['Float']>;
  apCurveB?: InputMaybe<Scalars['Float']>;
  apCurveC?: InputMaybe<Scalars['Float']>;
  apCurveD?: InputMaybe<Scalars['Float']>;
  apCurveE?: InputMaybe<Scalars['Float']>;
  categoryDisplayName?: InputMaybe<Scalars['String']>;
  categoryName: Scalars['String'];
  countsTowardsOverall: Scalars['Boolean'];
  createdDate: Scalars['Datetime'];
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['BigInt']>;
  playerCurveK?: InputMaybe<Scalars['Float']>;
  playerCurveX1?: InputMaybe<Scalars['Float']>;
  playerCurveY1?: InputMaybe<Scalars['Float']>;
};

/** Represents an update to a `Category`. Fields that are set will be updated. */
export type CategoryPatch = {
  apCurveA?: InputMaybe<Scalars['Float']>;
  apCurveB?: InputMaybe<Scalars['Float']>;
  apCurveC?: InputMaybe<Scalars['Float']>;
  apCurveD?: InputMaybe<Scalars['Float']>;
  apCurveE?: InputMaybe<Scalars['Float']>;
  categoryDisplayName?: InputMaybe<Scalars['String']>;
  categoryName?: InputMaybe<Scalars['String']>;
  countsTowardsOverall?: InputMaybe<Scalars['Boolean']>;
  createdDate?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['BigInt']>;
  playerCurveK?: InputMaybe<Scalars['Float']>;
  playerCurveX1?: InputMaybe<Scalars['Float']>;
  playerCurveY1?: InputMaybe<Scalars['Float']>;
};

/** All input for the create `BeatMap` mutation. */
export type CreateBeatMapInput = {
  /** The `BeatMap` to be created by this mutation. */
  beatMap: BeatMapInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** The output of our create `BeatMap` mutation. */
export type CreateBeatMapPayload = {
  __typename?: 'CreateBeatMapPayload';
  /** The `BeatMap` that was created by this mutation. */
  beatMap?: Maybe<BeatMap>;
  /** An edge for our `BeatMap`. May be used by Relay 1. */
  beatMapEdge?: Maybe<BeatMapsEdge>;
  /** Reads a single `Category` that is related to this `BeatMap`. */
  category?: Maybe<Category>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Song` that is related to this `BeatMap`. */
  songBySong?: Maybe<Song>;
};


/** The output of our create `BeatMap` mutation. */
export type CreateBeatMapPayloadBeatMapEdgeArgs = {
  orderBy?: InputMaybe<Array<BeatMapsOrderBy>>;
};

/** All input for the create `Category` mutation. */
export type CreateCategoryInput = {
  /** The `Category` to be created by this mutation. */
  category: CategoryInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** The output of our create `Category` mutation. */
export type CreateCategoryPayload = {
  __typename?: 'CreateCategoryPayload';
  /** The `Category` that was created by this mutation. */
  category?: Maybe<Category>;
  /** An edge for our `Category`. May be used by Relay 1. */
  categoryEdge?: Maybe<CategoriesEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Category` mutation. */
export type CreateCategoryPayloadCategoryEdgeArgs = {
  orderBy?: InputMaybe<Array<CategoriesOrderBy>>;
};

/** All input for the create `Databasechangelog` mutation. */
export type CreateDatabasechangelogInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Databasechangelog` to be created by this mutation. */
  databasechangelog: DatabasechangelogInput;
};

/** The output of our create `Databasechangelog` mutation. */
export type CreateDatabasechangelogPayload = {
  __typename?: 'CreateDatabasechangelogPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Databasechangelog` that was created by this mutation. */
  databasechangelog?: Maybe<Databasechangelog>;
  /** An edge for our `Databasechangelog`. May be used by Relay 1. */
  databasechangelogEdge?: Maybe<DatabasechangelogsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Databasechangelog` mutation. */
export type CreateDatabasechangelogPayloadDatabasechangelogEdgeArgs = {
  orderBy?: InputMaybe<Array<DatabasechangelogsOrderBy>>;
};

/** All input for the create `Databasechangeloglock` mutation. */
export type CreateDatabasechangeloglockInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Databasechangeloglock` to be created by this mutation. */
  databasechangeloglock: DatabasechangeloglockInput;
};

/** The output of our create `Databasechangeloglock` mutation. */
export type CreateDatabasechangeloglockPayload = {
  __typename?: 'CreateDatabasechangeloglockPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Databasechangeloglock` that was created by this mutation. */
  databasechangeloglock?: Maybe<Databasechangeloglock>;
  /** An edge for our `Databasechangeloglock`. May be used by Relay 1. */
  databasechangeloglockEdge?: Maybe<DatabasechangeloglocksEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Databasechangeloglock` mutation. */
export type CreateDatabasechangeloglockPayloadDatabasechangeloglockEdgeArgs = {
  orderBy?: InputMaybe<Array<DatabasechangeloglocksOrderBy>>;
};

/** All input for the create `PlayerCategoryStat` mutation. */
export type CreatePlayerCategoryStatInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `PlayerCategoryStat` to be created by this mutation. */
  playerCategoryStat: PlayerCategoryStatInput;
};

/** The output of our create `PlayerCategoryStat` mutation. */
export type CreatePlayerCategoryStatPayload = {
  __typename?: 'CreatePlayerCategoryStatPayload';
  /** Reads a single `Category` that is related to this `PlayerCategoryStat`. */
  category?: Maybe<Category>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `PlayerDatum` that is related to this `PlayerCategoryStat`. */
  player?: Maybe<PlayerDatum>;
  /** The `PlayerCategoryStat` that was created by this mutation. */
  playerCategoryStat?: Maybe<PlayerCategoryStat>;
  /** An edge for our `PlayerCategoryStat`. May be used by Relay 1. */
  playerCategoryStatEdge?: Maybe<PlayerCategoryStatsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `PlayerCategoryStat` mutation. */
export type CreatePlayerCategoryStatPayloadPlayerCategoryStatEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerCategoryStatsOrderBy>>;
};

/** All input for the create `PlayerDatum` mutation. */
export type CreatePlayerDatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `PlayerDatum` to be created by this mutation. */
  playerDatum: PlayerDatumInput;
};

/** The output of our create `PlayerDatum` mutation. */
export type CreatePlayerDatumPayload = {
  __typename?: 'CreatePlayerDatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PlayerDatum` that was created by this mutation. */
  playerDatum?: Maybe<PlayerDatum>;
  /** An edge for our `PlayerDatum`. May be used by Relay 1. */
  playerDatumEdge?: Maybe<PlayerDataEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `PlayerDatum` mutation. */
export type CreatePlayerDatumPayloadPlayerDatumEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerDataOrderBy>>;
};

/** All input for the create `PlayerRankHistory` mutation. */
export type CreatePlayerRankHistoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `PlayerRankHistory` to be created by this mutation. */
  playerRankHistory: PlayerRankHistoryInput;
};

/** The output of our create `PlayerRankHistory` mutation. */
export type CreatePlayerRankHistoryPayload = {
  __typename?: 'CreatePlayerRankHistoryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PlayerRankHistory` that was created by this mutation. */
  playerRankHistory?: Maybe<PlayerRankHistory>;
  /** An edge for our `PlayerRankHistory`. May be used by Relay 1. */
  playerRankHistoryEdge?: Maybe<PlayerRankHistoriesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `PlayerRankHistory` mutation. */
export type CreatePlayerRankHistoryPayloadPlayerRankHistoryEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerRankHistoriesOrderBy>>;
};

/** All input for the create `ScoreDataHistory` mutation. */
export type CreateScoreDataHistoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `ScoreDataHistory` to be created by this mutation. */
  scoreDataHistory: ScoreDataHistoryInput;
};

/** The output of our create `ScoreDataHistory` mutation. */
export type CreateScoreDataHistoryPayload = {
  __typename?: 'CreateScoreDataHistoryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `PlayerDatum` that is related to this `ScoreDataHistory`. */
  player?: Maybe<PlayerDatum>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `ScoreDataHistory` that was created by this mutation. */
  scoreDataHistory?: Maybe<ScoreDataHistory>;
  /** An edge for our `ScoreDataHistory`. May be used by Relay 1. */
  scoreDataHistoryEdge?: Maybe<ScoreDataHistoriesEdge>;
};


/** The output of our create `ScoreDataHistory` mutation. */
export type CreateScoreDataHistoryPayloadScoreDataHistoryEdgeArgs = {
  orderBy?: InputMaybe<Array<ScoreDataHistoriesOrderBy>>;
};

/** All input for the create `ScoreDatum` mutation. */
export type CreateScoreDatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `ScoreDatum` to be created by this mutation. */
  scoreDatum: ScoreDatumInput;
};

/** The output of our create `ScoreDatum` mutation. */
export type CreateScoreDatumPayload = {
  __typename?: 'CreateScoreDatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `PlayerDatum` that is related to this `ScoreDatum`. */
  player?: Maybe<PlayerDatum>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `ScoreDatum` that was created by this mutation. */
  scoreDatum?: Maybe<ScoreDatum>;
  /** An edge for our `ScoreDatum`. May be used by Relay 1. */
  scoreDatumEdge?: Maybe<ScoreDataEdge>;
};


/** The output of our create `ScoreDatum` mutation. */
export type CreateScoreDatumPayloadScoreDatumEdgeArgs = {
  orderBy?: InputMaybe<Array<ScoreDataOrderBy>>;
};

/** All input for the create `Song` mutation. */
export type CreateSongInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Song` to be created by this mutation. */
  song: SongInput;
};

/** The output of our create `Song` mutation. */
export type CreateSongPayload = {
  __typename?: 'CreateSongPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Song` that was created by this mutation. */
  song?: Maybe<Song>;
  /** An edge for our `Song`. May be used by Relay 1. */
  songEdge?: Maybe<SongsEdge>;
};


/** The output of our create `Song` mutation. */
export type CreateSongPayloadSongEdgeArgs = {
  orderBy?: InputMaybe<Array<SongsOrderBy>>;
};

/** All input for the create `StaffUser` mutation. */
export type CreateStaffUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `StaffUser` to be created by this mutation. */
  staffUser: StaffUserInput;
};

/** The output of our create `StaffUser` mutation. */
export type CreateStaffUserPayload = {
  __typename?: 'CreateStaffUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `StaffUser` that was created by this mutation. */
  staffUser?: Maybe<StaffUser>;
  /** An edge for our `StaffUser`. May be used by Relay 1. */
  staffUserEdge?: Maybe<StaffUsersEdge>;
};


/** The output of our create `StaffUser` mutation. */
export type CreateStaffUserPayloadStaffUserEdgeArgs = {
  orderBy?: InputMaybe<Array<StaffUsersOrderBy>>;
};

export type Databasechangelog = {
  __typename?: 'Databasechangelog';
  author: Scalars['String'];
  comments?: Maybe<Scalars['String']>;
  contexts?: Maybe<Scalars['String']>;
  dateexecuted: Scalars['Datetime'];
  deploymentId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  exectype: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['String'];
  labels?: Maybe<Scalars['String']>;
  liquibase?: Maybe<Scalars['String']>;
  md5Sum?: Maybe<Scalars['String']>;
  orderexecuted: Scalars['Int'];
  tag?: Maybe<Scalars['String']>;
};

/**
 * A condition to be used against `Databasechangelog` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type DatabasechangelogCondition = {
  /** Checks for equality with the object’s `author` field. */
  author?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `comments` field. */
  comments?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `contexts` field. */
  contexts?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `dateexecuted` field. */
  dateexecuted?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `deploymentId` field. */
  deploymentId?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `exectype` field. */
  exectype?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `filename` field. */
  filename?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `labels` field. */
  labels?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `liquibase` field. */
  liquibase?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `md5Sum` field. */
  md5Sum?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `orderexecuted` field. */
  orderexecuted?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `tag` field. */
  tag?: InputMaybe<Scalars['String']>;
};

/** An input for mutations affecting `Databasechangelog` */
export type DatabasechangelogInput = {
  author: Scalars['String'];
  comments?: InputMaybe<Scalars['String']>;
  contexts?: InputMaybe<Scalars['String']>;
  dateexecuted: Scalars['Datetime'];
  deploymentId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  exectype: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['String'];
  labels?: InputMaybe<Scalars['String']>;
  liquibase?: InputMaybe<Scalars['String']>;
  md5Sum?: InputMaybe<Scalars['String']>;
  orderexecuted: Scalars['Int'];
  tag?: InputMaybe<Scalars['String']>;
};

export type Databasechangeloglock = Node & {
  __typename?: 'Databasechangeloglock';
  id: Scalars['Int'];
  locked: Scalars['Boolean'];
  lockedby?: Maybe<Scalars['String']>;
  lockgranted?: Maybe<Scalars['Datetime']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/**
 * A condition to be used against `Databasechangeloglock` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type DatabasechangeloglockCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `locked` field. */
  locked?: InputMaybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `lockedby` field. */
  lockedby?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `lockgranted` field. */
  lockgranted?: InputMaybe<Scalars['Datetime']>;
};

/** An input for mutations affecting `Databasechangeloglock` */
export type DatabasechangeloglockInput = {
  id: Scalars['Int'];
  locked: Scalars['Boolean'];
  lockedby?: InputMaybe<Scalars['String']>;
  lockgranted?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `Databasechangeloglock`. Fields that are set will be updated. */
export type DatabasechangeloglockPatch = {
  id?: InputMaybe<Scalars['Int']>;
  locked?: InputMaybe<Scalars['Boolean']>;
  lockedby?: InputMaybe<Scalars['String']>;
  lockgranted?: InputMaybe<Scalars['Datetime']>;
};

/** A connection to a list of `Databasechangeloglock` values. */
export type DatabasechangeloglocksConnection = {
  __typename?: 'DatabasechangeloglocksConnection';
  /** A list of edges which contains the `Databasechangeloglock` and cursor to aid in pagination. */
  edges: Array<DatabasechangeloglocksEdge>;
  /** A list of `Databasechangeloglock` objects. */
  nodes: Array<Databasechangeloglock>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Databasechangeloglock` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Databasechangeloglock` edge in the connection. */
export type DatabasechangeloglocksEdge = {
  __typename?: 'DatabasechangeloglocksEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Databasechangeloglock` at the end of the edge. */
  node: Databasechangeloglock;
};

/** Methods to use when ordering `Databasechangeloglock`. */
export enum DatabasechangeloglocksOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LockedbyAsc = 'LOCKEDBY_ASC',
  LockedbyDesc = 'LOCKEDBY_DESC',
  LockedAsc = 'LOCKED_ASC',
  LockedDesc = 'LOCKED_DESC',
  LockgrantedAsc = 'LOCKGRANTED_ASC',
  LockgrantedDesc = 'LOCKGRANTED_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A connection to a list of `Databasechangelog` values. */
export type DatabasechangelogsConnection = {
  __typename?: 'DatabasechangelogsConnection';
  /** A list of edges which contains the `Databasechangelog` and cursor to aid in pagination. */
  edges: Array<DatabasechangelogsEdge>;
  /** A list of `Databasechangelog` objects. */
  nodes: Array<Databasechangelog>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Databasechangelog` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Databasechangelog` edge in the connection. */
export type DatabasechangelogsEdge = {
  __typename?: 'DatabasechangelogsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Databasechangelog` at the end of the edge. */
  node: Databasechangelog;
};

/** Methods to use when ordering `Databasechangelog`. */
export enum DatabasechangelogsOrderBy {
  AuthorAsc = 'AUTHOR_ASC',
  AuthorDesc = 'AUTHOR_DESC',
  CommentsAsc = 'COMMENTS_ASC',
  CommentsDesc = 'COMMENTS_DESC',
  ContextsAsc = 'CONTEXTS_ASC',
  ContextsDesc = 'CONTEXTS_DESC',
  DateexecutedAsc = 'DATEEXECUTED_ASC',
  DateexecutedDesc = 'DATEEXECUTED_DESC',
  DeploymentIdAsc = 'DEPLOYMENT_ID_ASC',
  DeploymentIdDesc = 'DEPLOYMENT_ID_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  ExectypeAsc = 'EXECTYPE_ASC',
  ExectypeDesc = 'EXECTYPE_DESC',
  FilenameAsc = 'FILENAME_ASC',
  FilenameDesc = 'FILENAME_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LabelsAsc = 'LABELS_ASC',
  LabelsDesc = 'LABELS_DESC',
  LiquibaseAsc = 'LIQUIBASE_ASC',
  LiquibaseDesc = 'LIQUIBASE_DESC',
  Md5SumAsc = 'MD5SUM_ASC',
  Md5SumDesc = 'MD5SUM_DESC',
  Natural = 'NATURAL',
  OrderexecutedAsc = 'ORDEREXECUTED_ASC',
  OrderexecutedDesc = 'ORDEREXECUTED_DESC',
  TagAsc = 'TAG_ASC',
  TagDesc = 'TAG_DESC'
}

/** All input for the `deleteBeatMapByNodeId` mutation. */
export type DeleteBeatMapByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `BeatMap` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteBeatMap` mutation. */
export type DeleteBeatMapInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  leaderboardId: Scalars['BigInt'];
};

/** The output of our delete `BeatMap` mutation. */
export type DeleteBeatMapPayload = {
  __typename?: 'DeleteBeatMapPayload';
  /** The `BeatMap` that was deleted by this mutation. */
  beatMap?: Maybe<BeatMap>;
  /** An edge for our `BeatMap`. May be used by Relay 1. */
  beatMapEdge?: Maybe<BeatMapsEdge>;
  /** Reads a single `Category` that is related to this `BeatMap`. */
  category?: Maybe<Category>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedBeatMapNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Song` that is related to this `BeatMap`. */
  songBySong?: Maybe<Song>;
};


/** The output of our delete `BeatMap` mutation. */
export type DeleteBeatMapPayloadBeatMapEdgeArgs = {
  orderBy?: InputMaybe<Array<BeatMapsOrderBy>>;
};

/** All input for the `deleteCategoryByCategoryName` mutation. */
export type DeleteCategoryByCategoryNameInput = {
  categoryName: Scalars['String'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** All input for the `deleteCategoryByNodeId` mutation. */
export type DeleteCategoryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Category` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteCategory` mutation. */
export type DeleteCategoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** The output of our delete `Category` mutation. */
export type DeleteCategoryPayload = {
  __typename?: 'DeleteCategoryPayload';
  /** The `Category` that was deleted by this mutation. */
  category?: Maybe<Category>;
  /** An edge for our `Category`. May be used by Relay 1. */
  categoryEdge?: Maybe<CategoriesEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedCategoryNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Category` mutation. */
export type DeleteCategoryPayloadCategoryEdgeArgs = {
  orderBy?: InputMaybe<Array<CategoriesOrderBy>>;
};

/** All input for the `deleteDatabasechangeloglockByNodeId` mutation. */
export type DeleteDatabasechangeloglockByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Databasechangeloglock` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteDatabasechangeloglock` mutation. */
export type DeleteDatabasechangeloglockInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Databasechangeloglock` mutation. */
export type DeleteDatabasechangeloglockPayload = {
  __typename?: 'DeleteDatabasechangeloglockPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Databasechangeloglock` that was deleted by this mutation. */
  databasechangeloglock?: Maybe<Databasechangeloglock>;
  /** An edge for our `Databasechangeloglock`. May be used by Relay 1. */
  databasechangeloglockEdge?: Maybe<DatabasechangeloglocksEdge>;
  deletedDatabasechangeloglockNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Databasechangeloglock` mutation. */
export type DeleteDatabasechangeloglockPayloadDatabasechangeloglockEdgeArgs = {
  orderBy?: InputMaybe<Array<DatabasechangeloglocksOrderBy>>;
};

/** All input for the `deletePlayerCategoryStatByNodeId` mutation. */
export type DeletePlayerCategoryStatByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PlayerCategoryStat` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePlayerCategoryStat` mutation. */
export type DeletePlayerCategoryStatInput = {
  categoryId: Scalars['BigInt'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  playerId: Scalars['BigInt'];
};

/** The output of our delete `PlayerCategoryStat` mutation. */
export type DeletePlayerCategoryStatPayload = {
  __typename?: 'DeletePlayerCategoryStatPayload';
  /** Reads a single `Category` that is related to this `PlayerCategoryStat`. */
  category?: Maybe<Category>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedPlayerCategoryStatNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `PlayerDatum` that is related to this `PlayerCategoryStat`. */
  player?: Maybe<PlayerDatum>;
  /** The `PlayerCategoryStat` that was deleted by this mutation. */
  playerCategoryStat?: Maybe<PlayerCategoryStat>;
  /** An edge for our `PlayerCategoryStat`. May be used by Relay 1. */
  playerCategoryStatEdge?: Maybe<PlayerCategoryStatsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `PlayerCategoryStat` mutation. */
export type DeletePlayerCategoryStatPayloadPlayerCategoryStatEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerCategoryStatsOrderBy>>;
};

/** All input for the `deletePlayerDatumByNodeId` mutation. */
export type DeletePlayerDatumByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PlayerDatum` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePlayerDatum` mutation. */
export type DeletePlayerDatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  playerId: Scalars['BigInt'];
};

/** The output of our delete `PlayerDatum` mutation. */
export type DeletePlayerDatumPayload = {
  __typename?: 'DeletePlayerDatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedPlayerDatumNodeId?: Maybe<Scalars['ID']>;
  /** The `PlayerDatum` that was deleted by this mutation. */
  playerDatum?: Maybe<PlayerDatum>;
  /** An edge for our `PlayerDatum`. May be used by Relay 1. */
  playerDatumEdge?: Maybe<PlayerDataEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `PlayerDatum` mutation. */
export type DeletePlayerDatumPayloadPlayerDatumEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerDataOrderBy>>;
};

/** All input for the `deletePlayerRankHistoryByNodeId` mutation. */
export type DeletePlayerRankHistoryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PlayerRankHistory` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePlayerRankHistory` mutation. */
export type DeletePlayerRankHistoryInput = {
  categoryId: Scalars['BigInt'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  date: Scalars['Date'];
  playerId: Scalars['BigInt'];
};

/** The output of our delete `PlayerRankHistory` mutation. */
export type DeletePlayerRankHistoryPayload = {
  __typename?: 'DeletePlayerRankHistoryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedPlayerRankHistoryNodeId?: Maybe<Scalars['ID']>;
  /** The `PlayerRankHistory` that was deleted by this mutation. */
  playerRankHistory?: Maybe<PlayerRankHistory>;
  /** An edge for our `PlayerRankHistory`. May be used by Relay 1. */
  playerRankHistoryEdge?: Maybe<PlayerRankHistoriesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `PlayerRankHistory` mutation. */
export type DeletePlayerRankHistoryPayloadPlayerRankHistoryEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerRankHistoriesOrderBy>>;
};

/** All input for the `deleteScoreDataHistoryByNodeId` mutation. */
export type DeleteScoreDataHistoryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ScoreDataHistory` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteScoreDataHistory` mutation. */
export type DeleteScoreDataHistoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['BigInt'];
};

/** The output of our delete `ScoreDataHistory` mutation. */
export type DeleteScoreDataHistoryPayload = {
  __typename?: 'DeleteScoreDataHistoryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedScoreDataHistoryNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `PlayerDatum` that is related to this `ScoreDataHistory`. */
  player?: Maybe<PlayerDatum>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `ScoreDataHistory` that was deleted by this mutation. */
  scoreDataHistory?: Maybe<ScoreDataHistory>;
  /** An edge for our `ScoreDataHistory`. May be used by Relay 1. */
  scoreDataHistoryEdge?: Maybe<ScoreDataHistoriesEdge>;
};


/** The output of our delete `ScoreDataHistory` mutation. */
export type DeleteScoreDataHistoryPayloadScoreDataHistoryEdgeArgs = {
  orderBy?: InputMaybe<Array<ScoreDataHistoriesOrderBy>>;
};

/** All input for the `deleteScoreDatumByNodeId` mutation. */
export type DeleteScoreDatumByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ScoreDatum` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteScoreDatum` mutation. */
export type DeleteScoreDatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  scoreId: Scalars['BigInt'];
};

/** The output of our delete `ScoreDatum` mutation. */
export type DeleteScoreDatumPayload = {
  __typename?: 'DeleteScoreDatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedScoreDatumNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `PlayerDatum` that is related to this `ScoreDatum`. */
  player?: Maybe<PlayerDatum>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `ScoreDatum` that was deleted by this mutation. */
  scoreDatum?: Maybe<ScoreDatum>;
  /** An edge for our `ScoreDatum`. May be used by Relay 1. */
  scoreDatumEdge?: Maybe<ScoreDataEdge>;
};


/** The output of our delete `ScoreDatum` mutation. */
export type DeleteScoreDatumPayloadScoreDatumEdgeArgs = {
  orderBy?: InputMaybe<Array<ScoreDataOrderBy>>;
};

/** All input for the `deleteSongByNodeId` mutation. */
export type DeleteSongByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Song` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteSong` mutation. */
export type DeleteSongInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  songHash: Scalars['String'];
};

/** The output of our delete `Song` mutation. */
export type DeleteSongPayload = {
  __typename?: 'DeleteSongPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedSongNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Song` that was deleted by this mutation. */
  song?: Maybe<Song>;
  /** An edge for our `Song`. May be used by Relay 1. */
  songEdge?: Maybe<SongsEdge>;
};


/** The output of our delete `Song` mutation. */
export type DeleteSongPayloadSongEdgeArgs = {
  orderBy?: InputMaybe<Array<SongsOrderBy>>;
};

/** All input for the `deleteStaffUserByNodeId` mutation. */
export type DeleteStaffUserByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `StaffUser` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteStaffUser` mutation. */
export type DeleteStaffUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

/** The output of our delete `StaffUser` mutation. */
export type DeleteStaffUserPayload = {
  __typename?: 'DeleteStaffUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedStaffUserNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `StaffUser` that was deleted by this mutation. */
  staffUser?: Maybe<StaffUser>;
  /** An edge for our `StaffUser`. May be used by Relay 1. */
  staffUserEdge?: Maybe<StaffUsersEdge>;
};


/** The output of our delete `StaffUser` mutation. */
export type DeleteStaffUserPayloadStaffUserEdgeArgs = {
  orderBy?: InputMaybe<Array<StaffUsersOrderBy>>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  calcAp?: Maybe<CalcApPayload>;
  calcWeightedAp?: Maybe<CalcWeightedApPayload>;
  /** Creates a single `BeatMap`. */
  createBeatMap?: Maybe<CreateBeatMapPayload>;
  /** Creates a single `Category`. */
  createCategory?: Maybe<CreateCategoryPayload>;
  /** Creates a single `Databasechangelog`. */
  createDatabasechangelog?: Maybe<CreateDatabasechangelogPayload>;
  /** Creates a single `Databasechangeloglock`. */
  createDatabasechangeloglock?: Maybe<CreateDatabasechangeloglockPayload>;
  /** Creates a single `PlayerCategoryStat`. */
  createPlayerCategoryStat?: Maybe<CreatePlayerCategoryStatPayload>;
  /** Creates a single `PlayerDatum`. */
  createPlayerDatum?: Maybe<CreatePlayerDatumPayload>;
  /** Creates a single `PlayerRankHistory`. */
  createPlayerRankHistory?: Maybe<CreatePlayerRankHistoryPayload>;
  /** Creates a single `ScoreDataHistory`. */
  createScoreDataHistory?: Maybe<CreateScoreDataHistoryPayload>;
  /** Creates a single `ScoreDatum`. */
  createScoreDatum?: Maybe<CreateScoreDatumPayload>;
  /** Creates a single `Song`. */
  createSong?: Maybe<CreateSongPayload>;
  /** Creates a single `StaffUser`. */
  createStaffUser?: Maybe<CreateStaffUserPayload>;
  /** Deletes a single `BeatMap` using a unique key. */
  deleteBeatMap?: Maybe<DeleteBeatMapPayload>;
  /** Deletes a single `BeatMap` using its globally unique id. */
  deleteBeatMapByNodeId?: Maybe<DeleteBeatMapPayload>;
  /** Deletes a single `Category` using a unique key. */
  deleteCategory?: Maybe<DeleteCategoryPayload>;
  /** Deletes a single `Category` using a unique key. */
  deleteCategoryByCategoryName?: Maybe<DeleteCategoryPayload>;
  /** Deletes a single `Category` using its globally unique id. */
  deleteCategoryByNodeId?: Maybe<DeleteCategoryPayload>;
  /** Deletes a single `Databasechangeloglock` using a unique key. */
  deleteDatabasechangeloglock?: Maybe<DeleteDatabasechangeloglockPayload>;
  /** Deletes a single `Databasechangeloglock` using its globally unique id. */
  deleteDatabasechangeloglockByNodeId?: Maybe<DeleteDatabasechangeloglockPayload>;
  /** Deletes a single `PlayerCategoryStat` using a unique key. */
  deletePlayerCategoryStat?: Maybe<DeletePlayerCategoryStatPayload>;
  /** Deletes a single `PlayerCategoryStat` using its globally unique id. */
  deletePlayerCategoryStatByNodeId?: Maybe<DeletePlayerCategoryStatPayload>;
  /** Deletes a single `PlayerDatum` using a unique key. */
  deletePlayerDatum?: Maybe<DeletePlayerDatumPayload>;
  /** Deletes a single `PlayerDatum` using its globally unique id. */
  deletePlayerDatumByNodeId?: Maybe<DeletePlayerDatumPayload>;
  /** Deletes a single `PlayerRankHistory` using a unique key. */
  deletePlayerRankHistory?: Maybe<DeletePlayerRankHistoryPayload>;
  /** Deletes a single `PlayerRankHistory` using its globally unique id. */
  deletePlayerRankHistoryByNodeId?: Maybe<DeletePlayerRankHistoryPayload>;
  /** Deletes a single `ScoreDataHistory` using a unique key. */
  deleteScoreDataHistory?: Maybe<DeleteScoreDataHistoryPayload>;
  /** Deletes a single `ScoreDataHistory` using its globally unique id. */
  deleteScoreDataHistoryByNodeId?: Maybe<DeleteScoreDataHistoryPayload>;
  /** Deletes a single `ScoreDatum` using a unique key. */
  deleteScoreDatum?: Maybe<DeleteScoreDatumPayload>;
  /** Deletes a single `ScoreDatum` using its globally unique id. */
  deleteScoreDatumByNodeId?: Maybe<DeleteScoreDatumPayload>;
  /** Deletes a single `Song` using a unique key. */
  deleteSong?: Maybe<DeleteSongPayload>;
  /** Deletes a single `Song` using its globally unique id. */
  deleteSongByNodeId?: Maybe<DeleteSongPayload>;
  /** Deletes a single `StaffUser` using a unique key. */
  deleteStaffUser?: Maybe<DeleteStaffUserPayload>;
  /** Deletes a single `StaffUser` using its globally unique id. */
  deleteStaffUserByNodeId?: Maybe<DeleteStaffUserPayload>;
  /** Updates a single `BeatMap` using a unique key and a patch. */
  updateBeatMap?: Maybe<UpdateBeatMapPayload>;
  /** Updates a single `BeatMap` using its globally unique id and a patch. */
  updateBeatMapByNodeId?: Maybe<UpdateBeatMapPayload>;
  /** Updates a single `Category` using a unique key and a patch. */
  updateCategory?: Maybe<UpdateCategoryPayload>;
  /** Updates a single `Category` using a unique key and a patch. */
  updateCategoryByCategoryName?: Maybe<UpdateCategoryPayload>;
  /** Updates a single `Category` using its globally unique id and a patch. */
  updateCategoryByNodeId?: Maybe<UpdateCategoryPayload>;
  /** Updates a single `Databasechangeloglock` using a unique key and a patch. */
  updateDatabasechangeloglock?: Maybe<UpdateDatabasechangeloglockPayload>;
  /** Updates a single `Databasechangeloglock` using its globally unique id and a patch. */
  updateDatabasechangeloglockByNodeId?: Maybe<UpdateDatabasechangeloglockPayload>;
  /** Updates a single `PlayerCategoryStat` using a unique key and a patch. */
  updatePlayerCategoryStat?: Maybe<UpdatePlayerCategoryStatPayload>;
  /** Updates a single `PlayerCategoryStat` using its globally unique id and a patch. */
  updatePlayerCategoryStatByNodeId?: Maybe<UpdatePlayerCategoryStatPayload>;
  /** Updates a single `PlayerDatum` using a unique key and a patch. */
  updatePlayerDatum?: Maybe<UpdatePlayerDatumPayload>;
  /** Updates a single `PlayerDatum` using its globally unique id and a patch. */
  updatePlayerDatumByNodeId?: Maybe<UpdatePlayerDatumPayload>;
  /** Updates a single `PlayerRankHistory` using a unique key and a patch. */
  updatePlayerRankHistory?: Maybe<UpdatePlayerRankHistoryPayload>;
  /** Updates a single `PlayerRankHistory` using its globally unique id and a patch. */
  updatePlayerRankHistoryByNodeId?: Maybe<UpdatePlayerRankHistoryPayload>;
  /** Updates a single `ScoreDataHistory` using a unique key and a patch. */
  updateScoreDataHistory?: Maybe<UpdateScoreDataHistoryPayload>;
  /** Updates a single `ScoreDataHistory` using its globally unique id and a patch. */
  updateScoreDataHistoryByNodeId?: Maybe<UpdateScoreDataHistoryPayload>;
  /** Updates a single `ScoreDatum` using a unique key and a patch. */
  updateScoreDatum?: Maybe<UpdateScoreDatumPayload>;
  /** Updates a single `ScoreDatum` using its globally unique id and a patch. */
  updateScoreDatumByNodeId?: Maybe<UpdateScoreDatumPayload>;
  /** Updates a single `Song` using a unique key and a patch. */
  updateSong?: Maybe<UpdateSongPayload>;
  /** Updates a single `Song` using its globally unique id and a patch. */
  updateSongByNodeId?: Maybe<UpdateSongPayload>;
  /** Updates a single `StaffUser` using a unique key and a patch. */
  updateStaffUser?: Maybe<UpdateStaffUserPayload>;
  /** Updates a single `StaffUser` using its globally unique id and a patch. */
  updateStaffUserByNodeId?: Maybe<UpdateStaffUserPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCalcApArgs = {
  input: CalcApInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCalcWeightedApArgs = {
  input: CalcWeightedApInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateBeatMapArgs = {
  input: CreateBeatMapInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateDatabasechangelogArgs = {
  input: CreateDatabasechangelogInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateDatabasechangeloglockArgs = {
  input: CreateDatabasechangeloglockInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePlayerCategoryStatArgs = {
  input: CreatePlayerCategoryStatInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePlayerDatumArgs = {
  input: CreatePlayerDatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePlayerRankHistoryArgs = {
  input: CreatePlayerRankHistoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateScoreDataHistoryArgs = {
  input: CreateScoreDataHistoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateScoreDatumArgs = {
  input: CreateScoreDatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSongArgs = {
  input: CreateSongInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateStaffUserArgs = {
  input: CreateStaffUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBeatMapArgs = {
  input: DeleteBeatMapInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBeatMapByNodeIdArgs = {
  input: DeleteBeatMapByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCategoryArgs = {
  input: DeleteCategoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCategoryByCategoryNameArgs = {
  input: DeleteCategoryByCategoryNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCategoryByNodeIdArgs = {
  input: DeleteCategoryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDatabasechangeloglockArgs = {
  input: DeleteDatabasechangeloglockInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDatabasechangeloglockByNodeIdArgs = {
  input: DeleteDatabasechangeloglockByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayerCategoryStatArgs = {
  input: DeletePlayerCategoryStatInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayerCategoryStatByNodeIdArgs = {
  input: DeletePlayerCategoryStatByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayerDatumArgs = {
  input: DeletePlayerDatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayerDatumByNodeIdArgs = {
  input: DeletePlayerDatumByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayerRankHistoryArgs = {
  input: DeletePlayerRankHistoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePlayerRankHistoryByNodeIdArgs = {
  input: DeletePlayerRankHistoryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteScoreDataHistoryArgs = {
  input: DeleteScoreDataHistoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteScoreDataHistoryByNodeIdArgs = {
  input: DeleteScoreDataHistoryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteScoreDatumArgs = {
  input: DeleteScoreDatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteScoreDatumByNodeIdArgs = {
  input: DeleteScoreDatumByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSongArgs = {
  input: DeleteSongInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSongByNodeIdArgs = {
  input: DeleteSongByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteStaffUserArgs = {
  input: DeleteStaffUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteStaffUserByNodeIdArgs = {
  input: DeleteStaffUserByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBeatMapArgs = {
  input: UpdateBeatMapInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBeatMapByNodeIdArgs = {
  input: UpdateBeatMapByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCategoryByCategoryNameArgs = {
  input: UpdateCategoryByCategoryNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCategoryByNodeIdArgs = {
  input: UpdateCategoryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDatabasechangeloglockArgs = {
  input: UpdateDatabasechangeloglockInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDatabasechangeloglockByNodeIdArgs = {
  input: UpdateDatabasechangeloglockByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePlayerCategoryStatArgs = {
  input: UpdatePlayerCategoryStatInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePlayerCategoryStatByNodeIdArgs = {
  input: UpdatePlayerCategoryStatByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePlayerDatumArgs = {
  input: UpdatePlayerDatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePlayerDatumByNodeIdArgs = {
  input: UpdatePlayerDatumByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePlayerRankHistoryArgs = {
  input: UpdatePlayerRankHistoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePlayerRankHistoryByNodeIdArgs = {
  input: UpdatePlayerRankHistoryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateScoreDataHistoryArgs = {
  input: UpdateScoreDataHistoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateScoreDataHistoryByNodeIdArgs = {
  input: UpdateScoreDataHistoryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateScoreDatumArgs = {
  input: UpdateScoreDatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateScoreDatumByNodeIdArgs = {
  input: UpdateScoreDatumByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSongArgs = {
  input: UpdateSongInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSongByNodeIdArgs = {
  input: UpdateSongByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateStaffUserArgs = {
  input: UpdateStaffUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateStaffUserByNodeIdArgs = {
  input: UpdateStaffUserByNodeIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

export type OverallAccSaberPlayer = {
  __typename?: 'OverallAccSaberPlayer';
  ap?: Maybe<Scalars['Float']>;
  avatarUrl?: Maybe<Scalars['String']>;
  averageAcc?: Maybe<Scalars['Float']>;
  averageApPerMap?: Maybe<Scalars['Float']>;
  hmd?: Maybe<Scalars['String']>;
  isAccChamp?: Maybe<Scalars['Boolean']>;
  playerId?: Maybe<Scalars['BigInt']>;
  playerName?: Maybe<Scalars['String']>;
  rankedPlays?: Maybe<Scalars['BigInt']>;
  ranking?: Maybe<Scalars['BigInt']>;
  rankingLastWeek?: Maybe<Scalars['Int']>;
};

/**
 * A condition to be used against `OverallAccSaberPlayer` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type OverallAccSaberPlayerCondition = {
  /** Checks for equality with the object’s `ap` field. */
  ap?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `avatarUrl` field. */
  avatarUrl?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `averageAcc` field. */
  averageAcc?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `averageApPerMap` field. */
  averageApPerMap?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `hmd` field. */
  hmd?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `isAccChamp` field. */
  isAccChamp?: InputMaybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `playerId` field. */
  playerId?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `playerName` field. */
  playerName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `rankedPlays` field. */
  rankedPlays?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `ranking` field. */
  ranking?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `rankingLastWeek` field. */
  rankingLastWeek?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of `OverallAccSaberPlayer` values. */
export type OverallAccSaberPlayersConnection = {
  __typename?: 'OverallAccSaberPlayersConnection';
  /** A list of edges which contains the `OverallAccSaberPlayer` and cursor to aid in pagination. */
  edges: Array<OverallAccSaberPlayersEdge>;
  /** A list of `OverallAccSaberPlayer` objects. */
  nodes: Array<OverallAccSaberPlayer>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `OverallAccSaberPlayer` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `OverallAccSaberPlayer` edge in the connection. */
export type OverallAccSaberPlayersEdge = {
  __typename?: 'OverallAccSaberPlayersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `OverallAccSaberPlayer` at the end of the edge. */
  node: OverallAccSaberPlayer;
};

/** Methods to use when ordering `OverallAccSaberPlayer`. */
export enum OverallAccSaberPlayersOrderBy {
  ApAsc = 'AP_ASC',
  ApDesc = 'AP_DESC',
  AvatarUrlAsc = 'AVATAR_URL_ASC',
  AvatarUrlDesc = 'AVATAR_URL_DESC',
  AverageAccAsc = 'AVERAGE_ACC_ASC',
  AverageAccDesc = 'AVERAGE_ACC_DESC',
  AverageApPerMapAsc = 'AVERAGE_AP_PER_MAP_ASC',
  AverageApPerMapDesc = 'AVERAGE_AP_PER_MAP_DESC',
  HmdAsc = 'HMD_ASC',
  HmdDesc = 'HMD_DESC',
  IsAccChampAsc = 'IS_ACC_CHAMP_ASC',
  IsAccChampDesc = 'IS_ACC_CHAMP_DESC',
  Natural = 'NATURAL',
  PlayerIdAsc = 'PLAYER_ID_ASC',
  PlayerIdDesc = 'PLAYER_ID_DESC',
  PlayerNameAsc = 'PLAYER_NAME_ASC',
  PlayerNameDesc = 'PLAYER_NAME_DESC',
  RankedPlaysAsc = 'RANKED_PLAYS_ASC',
  RankedPlaysDesc = 'RANKED_PLAYS_DESC',
  RankingAsc = 'RANKING_ASC',
  RankingDesc = 'RANKING_DESC',
  RankingLastWeekAsc = 'RANKING_LAST_WEEK_ASC',
  RankingLastWeekDesc = 'RANKING_LAST_WEEK_DESC'
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
};

export type PlayerCategoryStat = Node & {
  __typename?: 'PlayerCategoryStat';
  ap?: Maybe<Scalars['Float']>;
  averageAcc?: Maybe<Scalars['Float']>;
  averageAp?: Maybe<Scalars['Float']>;
  /** Reads a single `Category` that is related to this `PlayerCategoryStat`. */
  category?: Maybe<Category>;
  categoryId: Scalars['BigInt'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `PlayerDatum` that is related to this `PlayerCategoryStat`. */
  player?: Maybe<PlayerDatum>;
  playerId: Scalars['BigInt'];
  rankedPlays: Scalars['Int'];
  rankingLastWeek: Scalars['Int'];
};

/**
 * A condition to be used against `PlayerCategoryStat` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PlayerCategoryStatCondition = {
  /** Checks for equality with the object’s `ap` field. */
  ap?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `averageAcc` field. */
  averageAcc?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `averageAp` field. */
  averageAp?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `categoryId` field. */
  categoryId?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `playerId` field. */
  playerId?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `rankedPlays` field. */
  rankedPlays?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `rankingLastWeek` field. */
  rankingLastWeek?: InputMaybe<Scalars['Int']>;
};

/** An input for mutations affecting `PlayerCategoryStat` */
export type PlayerCategoryStatInput = {
  ap?: InputMaybe<Scalars['Float']>;
  averageAcc?: InputMaybe<Scalars['Float']>;
  averageAp?: InputMaybe<Scalars['Float']>;
  categoryId: Scalars['BigInt'];
  playerId: Scalars['BigInt'];
  rankedPlays?: InputMaybe<Scalars['Int']>;
  rankingLastWeek?: InputMaybe<Scalars['Int']>;
};

/** Represents an update to a `PlayerCategoryStat`. Fields that are set will be updated. */
export type PlayerCategoryStatPatch = {
  ap?: InputMaybe<Scalars['Float']>;
  averageAcc?: InputMaybe<Scalars['Float']>;
  averageAp?: InputMaybe<Scalars['Float']>;
  categoryId?: InputMaybe<Scalars['BigInt']>;
  playerId?: InputMaybe<Scalars['BigInt']>;
  rankedPlays?: InputMaybe<Scalars['Int']>;
  rankingLastWeek?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of `PlayerCategoryStat` values. */
export type PlayerCategoryStatsConnection = {
  __typename?: 'PlayerCategoryStatsConnection';
  /** A list of edges which contains the `PlayerCategoryStat` and cursor to aid in pagination. */
  edges: Array<PlayerCategoryStatsEdge>;
  /** A list of `PlayerCategoryStat` objects. */
  nodes: Array<PlayerCategoryStat>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PlayerCategoryStat` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `PlayerCategoryStat` edge in the connection. */
export type PlayerCategoryStatsEdge = {
  __typename?: 'PlayerCategoryStatsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `PlayerCategoryStat` at the end of the edge. */
  node: PlayerCategoryStat;
};

/** Methods to use when ordering `PlayerCategoryStat`. */
export enum PlayerCategoryStatsOrderBy {
  ApAsc = 'AP_ASC',
  ApDesc = 'AP_DESC',
  AverageAccAsc = 'AVERAGE_ACC_ASC',
  AverageAccDesc = 'AVERAGE_ACC_DESC',
  AverageApAsc = 'AVERAGE_AP_ASC',
  AverageApDesc = 'AVERAGE_AP_DESC',
  CategoryIdAsc = 'CATEGORY_ID_ASC',
  CategoryIdDesc = 'CATEGORY_ID_DESC',
  Natural = 'NATURAL',
  PlayerIdAsc = 'PLAYER_ID_ASC',
  PlayerIdDesc = 'PLAYER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RankedPlaysAsc = 'RANKED_PLAYS_ASC',
  RankedPlaysDesc = 'RANKED_PLAYS_DESC',
  RankingLastWeekAsc = 'RANKING_LAST_WEEK_ASC',
  RankingLastWeekDesc = 'RANKING_LAST_WEEK_DESC'
}

/** A connection to a list of `PlayerDatum` values. */
export type PlayerDataConnection = {
  __typename?: 'PlayerDataConnection';
  /** A list of edges which contains the `PlayerDatum` and cursor to aid in pagination. */
  edges: Array<PlayerDataEdge>;
  /** A list of `PlayerDatum` objects. */
  nodes: Array<PlayerDatum>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PlayerDatum` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `PlayerDatum` edge in the connection. */
export type PlayerDataEdge = {
  __typename?: 'PlayerDataEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `PlayerDatum` at the end of the edge. */
  node: PlayerDatum;
};

/** Methods to use when ordering `PlayerDatum`. */
export enum PlayerDataOrderBy {
  AvatarUrlAsc = 'AVATAR_URL_ASC',
  AvatarUrlDesc = 'AVATAR_URL_DESC',
  HmdAsc = 'HMD_ASC',
  HmdDesc = 'HMD_DESC',
  IsAccChampAsc = 'IS_ACC_CHAMP_ASC',
  IsAccChampDesc = 'IS_ACC_CHAMP_DESC',
  JoinDateAsc = 'JOIN_DATE_ASC',
  JoinDateDesc = 'JOIN_DATE_DESC',
  Natural = 'NATURAL',
  PlayerIdAsc = 'PLAYER_ID_ASC',
  PlayerIdDesc = 'PLAYER_ID_DESC',
  PlayerNameAsc = 'PLAYER_NAME_ASC',
  PlayerNameDesc = 'PLAYER_NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type PlayerDatum = Node & {
  __typename?: 'PlayerDatum';
  avatarUrl?: Maybe<Scalars['String']>;
  hmd?: Maybe<Scalars['String']>;
  isAccChamp: Scalars['Boolean'];
  joinDate: Scalars['Datetime'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads and enables pagination through a set of `PlayerCategoryStat`. */
  playerCategoryStatsByPlayerId: PlayerCategoryStatsConnection;
  playerId: Scalars['BigInt'];
  playerName?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `ScoreDatum`. */
  scoreDataByPlayerId: ScoreDataConnection;
  /** Reads and enables pagination through a set of `ScoreDataHistory`. */
  scoreDataHistoriesByPlayerId: ScoreDataHistoriesConnection;
};


export type PlayerDatumPlayerCategoryStatsByPlayerIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<PlayerCategoryStatCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PlayerCategoryStatsOrderBy>>;
};


export type PlayerDatumScoreDataByPlayerIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ScoreDatumCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ScoreDataOrderBy>>;
};


export type PlayerDatumScoreDataHistoriesByPlayerIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ScoreDataHistoryCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ScoreDataHistoriesOrderBy>>;
};

/**
 * A condition to be used against `PlayerDatum` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type PlayerDatumCondition = {
  /** Checks for equality with the object’s `avatarUrl` field. */
  avatarUrl?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `hmd` field. */
  hmd?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `isAccChamp` field. */
  isAccChamp?: InputMaybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `joinDate` field. */
  joinDate?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `playerId` field. */
  playerId?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `playerName` field. */
  playerName?: InputMaybe<Scalars['String']>;
};

/** An input for mutations affecting `PlayerDatum` */
export type PlayerDatumInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  hmd?: InputMaybe<Scalars['String']>;
  isAccChamp?: InputMaybe<Scalars['Boolean']>;
  joinDate: Scalars['Datetime'];
  playerId: Scalars['BigInt'];
  playerName?: InputMaybe<Scalars['String']>;
};

/** Represents an update to a `PlayerDatum`. Fields that are set will be updated. */
export type PlayerDatumPatch = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  hmd?: InputMaybe<Scalars['String']>;
  isAccChamp?: InputMaybe<Scalars['Boolean']>;
  joinDate?: InputMaybe<Scalars['Datetime']>;
  playerId?: InputMaybe<Scalars['BigInt']>;
  playerName?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of `PlayerRankHistory` values. */
export type PlayerRankHistoriesConnection = {
  __typename?: 'PlayerRankHistoriesConnection';
  /** A list of edges which contains the `PlayerRankHistory` and cursor to aid in pagination. */
  edges: Array<PlayerRankHistoriesEdge>;
  /** A list of `PlayerRankHistory` objects. */
  nodes: Array<PlayerRankHistory>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PlayerRankHistory` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `PlayerRankHistory` edge in the connection. */
export type PlayerRankHistoriesEdge = {
  __typename?: 'PlayerRankHistoriesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `PlayerRankHistory` at the end of the edge. */
  node: PlayerRankHistory;
};

/** Methods to use when ordering `PlayerRankHistory`. */
export enum PlayerRankHistoriesOrderBy {
  ApAsc = 'AP_ASC',
  ApDesc = 'AP_DESC',
  AverageAccAsc = 'AVERAGE_ACC_ASC',
  AverageAccDesc = 'AVERAGE_ACC_DESC',
  AverageApPerMapAsc = 'AVERAGE_AP_PER_MAP_ASC',
  AverageApPerMapDesc = 'AVERAGE_AP_PER_MAP_DESC',
  CategoryIdAsc = 'CATEGORY_ID_ASC',
  CategoryIdDesc = 'CATEGORY_ID_DESC',
  DateAsc = 'DATE_ASC',
  DateDesc = 'DATE_DESC',
  Natural = 'NATURAL',
  PlayerIdAsc = 'PLAYER_ID_ASC',
  PlayerIdDesc = 'PLAYER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RankedPlaysAsc = 'RANKED_PLAYS_ASC',
  RankedPlaysDesc = 'RANKED_PLAYS_DESC',
  RankingAsc = 'RANKING_ASC',
  RankingDesc = 'RANKING_DESC'
}

export type PlayerRankHistory = Node & {
  __typename?: 'PlayerRankHistory';
  ap: Scalars['Float'];
  averageAcc: Scalars['Float'];
  averageApPerMap: Scalars['Float'];
  categoryId: Scalars['BigInt'];
  date: Scalars['Date'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  playerId: Scalars['BigInt'];
  rankedPlays: Scalars['Int'];
  ranking: Scalars['Int'];
};

/**
 * A condition to be used against `PlayerRankHistory` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PlayerRankHistoryCondition = {
  /** Checks for equality with the object’s `ap` field. */
  ap?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `averageAcc` field. */
  averageAcc?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `averageApPerMap` field. */
  averageApPerMap?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `categoryId` field. */
  categoryId?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `date` field. */
  date?: InputMaybe<Scalars['Date']>;
  /** Checks for equality with the object’s `playerId` field. */
  playerId?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `rankedPlays` field. */
  rankedPlays?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `ranking` field. */
  ranking?: InputMaybe<Scalars['Int']>;
};

/** An input for mutations affecting `PlayerRankHistory` */
export type PlayerRankHistoryInput = {
  ap: Scalars['Float'];
  averageAcc: Scalars['Float'];
  averageApPerMap: Scalars['Float'];
  categoryId: Scalars['BigInt'];
  date: Scalars['Date'];
  playerId: Scalars['BigInt'];
  rankedPlays: Scalars['Int'];
  ranking: Scalars['Int'];
};

/** Represents an update to a `PlayerRankHistory`. Fields that are set will be updated. */
export type PlayerRankHistoryPatch = {
  ap?: InputMaybe<Scalars['Float']>;
  averageAcc?: InputMaybe<Scalars['Float']>;
  averageApPerMap?: InputMaybe<Scalars['Float']>;
  categoryId?: InputMaybe<Scalars['BigInt']>;
  date?: InputMaybe<Scalars['Date']>;
  playerId?: InputMaybe<Scalars['BigInt']>;
  rankedPlays?: InputMaybe<Scalars['Int']>;
  ranking?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Reads and enables pagination through a set of `AccSaberScore`. */
  accSaberScores?: Maybe<AccSaberScoresConnection>;
  beatMap?: Maybe<BeatMap>;
  /** Reads a single `BeatMap` using its globally unique `ID`. */
  beatMapByNodeId?: Maybe<BeatMap>;
  /** Reads and enables pagination through a set of `BeatMap`. */
  beatMaps?: Maybe<BeatMapsConnection>;
  /** Reads and enables pagination through a set of `Category`. */
  categories?: Maybe<CategoriesConnection>;
  category?: Maybe<Category>;
  /** Reads and enables pagination through a set of `CategoryAccSaberPlayer`. */
  categoryAccSaberPlayers?: Maybe<CategoryAccSaberPlayersConnection>;
  categoryByCategoryName?: Maybe<Category>;
  /** Reads a single `Category` using its globally unique `ID`. */
  categoryByNodeId?: Maybe<Category>;
  databasechangeloglock?: Maybe<Databasechangeloglock>;
  /** Reads a single `Databasechangeloglock` using its globally unique `ID`. */
  databasechangeloglockByNodeId?: Maybe<Databasechangeloglock>;
  /** Reads and enables pagination through a set of `Databasechangeloglock`. */
  databasechangeloglocks?: Maybe<DatabasechangeloglocksConnection>;
  /** Reads and enables pagination through a set of `Databasechangelog`. */
  databasechangelogs?: Maybe<DatabasechangelogsConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /** Reads and enables pagination through a set of `OverallAccSaberPlayer`. */
  overallAccSaberPlayers?: Maybe<OverallAccSaberPlayersConnection>;
  playerCategoryStat?: Maybe<PlayerCategoryStat>;
  /** Reads a single `PlayerCategoryStat` using its globally unique `ID`. */
  playerCategoryStatByNodeId?: Maybe<PlayerCategoryStat>;
  /** Reads and enables pagination through a set of `PlayerCategoryStat`. */
  playerCategoryStats?: Maybe<PlayerCategoryStatsConnection>;
  /** Reads and enables pagination through a set of `PlayerDatum`. */
  playerData?: Maybe<PlayerDataConnection>;
  playerDatum?: Maybe<PlayerDatum>;
  /** Reads a single `PlayerDatum` using its globally unique `ID`. */
  playerDatumByNodeId?: Maybe<PlayerDatum>;
  /** Reads and enables pagination through a set of `PlayerRankHistory`. */
  playerRankHistories?: Maybe<PlayerRankHistoriesConnection>;
  playerRankHistory?: Maybe<PlayerRankHistory>;
  /** Reads a single `PlayerRankHistory` using its globally unique `ID`. */
  playerRankHistoryByNodeId?: Maybe<PlayerRankHistory>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Reads and enables pagination through a set of `ScoreDatum`. */
  scoreData?: Maybe<ScoreDataConnection>;
  /** Reads and enables pagination through a set of `ScoreDataHistory`. */
  scoreDataHistories?: Maybe<ScoreDataHistoriesConnection>;
  scoreDataHistory?: Maybe<ScoreDataHistory>;
  /** Reads a single `ScoreDataHistory` using its globally unique `ID`. */
  scoreDataHistoryByNodeId?: Maybe<ScoreDataHistory>;
  scoreDatum?: Maybe<ScoreDatum>;
  /** Reads a single `ScoreDatum` using its globally unique `ID`. */
  scoreDatumByNodeId?: Maybe<ScoreDatum>;
  song?: Maybe<Song>;
  /** Reads a single `Song` using its globally unique `ID`. */
  songByNodeId?: Maybe<Song>;
  /** Reads and enables pagination through a set of `Song`. */
  songs?: Maybe<SongsConnection>;
  staffUser?: Maybe<StaffUser>;
  /** Reads a single `StaffUser` using its globally unique `ID`. */
  staffUserByNodeId?: Maybe<StaffUser>;
  /** Reads and enables pagination through a set of `StaffUser`. */
  staffUsers?: Maybe<StaffUsersConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAccSaberScoresArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<AccSaberScoreCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AccSaberScoresOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBeatMapArgs = {
  leaderboardId: Scalars['BigInt'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBeatMapByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBeatMapsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<BeatMapCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BeatMapsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCategoriesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<CategoryCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CategoriesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCategoryArgs = {
  id: Scalars['BigInt'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCategoryAccSaberPlayersArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<CategoryAccSaberPlayerCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CategoryAccSaberPlayersOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCategoryByCategoryNameArgs = {
  categoryName: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCategoryByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDatabasechangeloglockArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDatabasechangeloglockByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDatabasechangeloglocksArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<DatabasechangeloglockCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DatabasechangeloglocksOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDatabasechangelogsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<DatabasechangelogCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DatabasechangelogsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOverallAccSaberPlayersArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<OverallAccSaberPlayerCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OverallAccSaberPlayersOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerCategoryStatArgs = {
  categoryId: Scalars['BigInt'];
  playerId: Scalars['BigInt'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerCategoryStatByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerCategoryStatsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<PlayerCategoryStatCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PlayerCategoryStatsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerDataArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<PlayerDatumCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PlayerDataOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerDatumArgs = {
  playerId: Scalars['BigInt'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerDatumByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerRankHistoriesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<PlayerRankHistoryCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PlayerRankHistoriesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerRankHistoryArgs = {
  categoryId: Scalars['BigInt'];
  date: Scalars['Date'];
  playerId: Scalars['BigInt'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPlayerRankHistoryByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryScoreDataArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ScoreDatumCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ScoreDataOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryScoreDataHistoriesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ScoreDataHistoryCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ScoreDataHistoriesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryScoreDataHistoryArgs = {
  id: Scalars['BigInt'];
};


/** The root query type which gives access points into the data universe. */
export type QueryScoreDataHistoryByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryScoreDatumArgs = {
  scoreId: Scalars['BigInt'];
};


/** The root query type which gives access points into the data universe. */
export type QueryScoreDatumByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySongArgs = {
  songHash: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySongByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySongsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<SongCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<SongsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryStaffUserArgs = {
  username: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStaffUserByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStaffUsersArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<StaffUserCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<StaffUsersOrderBy>>;
};

/** A connection to a list of `ScoreDatum` values. */
export type ScoreDataConnection = {
  __typename?: 'ScoreDataConnection';
  /** A list of edges which contains the `ScoreDatum` and cursor to aid in pagination. */
  edges: Array<ScoreDataEdge>;
  /** A list of `ScoreDatum` objects. */
  nodes: Array<ScoreDatum>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ScoreDatum` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ScoreDatum` edge in the connection. */
export type ScoreDataEdge = {
  __typename?: 'ScoreDataEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ScoreDatum` at the end of the edge. */
  node: ScoreDatum;
};

/** A connection to a list of `ScoreDataHistory` values. */
export type ScoreDataHistoriesConnection = {
  __typename?: 'ScoreDataHistoriesConnection';
  /** A list of edges which contains the `ScoreDataHistory` and cursor to aid in pagination. */
  edges: Array<ScoreDataHistoriesEdge>;
  /** A list of `ScoreDataHistory` objects. */
  nodes: Array<ScoreDataHistory>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ScoreDataHistory` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ScoreDataHistory` edge in the connection. */
export type ScoreDataHistoriesEdge = {
  __typename?: 'ScoreDataHistoriesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ScoreDataHistory` at the end of the edge. */
  node: ScoreDataHistory;
};

/** Methods to use when ordering `ScoreDataHistory`. */
export enum ScoreDataHistoriesOrderBy {
  AccuracyAsc = 'ACCURACY_ASC',
  AccuracyDesc = 'ACCURACY_DESC',
  ApAsc = 'AP_ASC',
  ApDesc = 'AP_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  MapLeaderboardIdAsc = 'MAP_LEADERBOARD_ID_ASC',
  MapLeaderboardIdDesc = 'MAP_LEADERBOARD_ID_DESC',
  ModsAsc = 'MODS_ASC',
  ModsDesc = 'MODS_DESC',
  Natural = 'NATURAL',
  PlayerIdAsc = 'PLAYER_ID_ASC',
  PlayerIdDesc = 'PLAYER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ScoreAsc = 'SCORE_ASC',
  ScoreDesc = 'SCORE_DESC',
  ScoreIdAsc = 'SCORE_ID_ASC',
  ScoreIdDesc = 'SCORE_ID_DESC',
  TimeSetAsc = 'TIME_SET_ASC',
  TimeSetDesc = 'TIME_SET_DESC',
  UnmodififiedScoreAsc = 'UNMODIFIFIED_SCORE_ASC',
  UnmodififiedScoreDesc = 'UNMODIFIFIED_SCORE_DESC',
  WeightedApAsc = 'WEIGHTED_AP_ASC',
  WeightedApDesc = 'WEIGHTED_AP_DESC'
}

export type ScoreDataHistory = Node & {
  __typename?: 'ScoreDataHistory';
  accuracy?: Maybe<Scalars['Float']>;
  ap?: Maybe<Scalars['Float']>;
  id: Scalars['BigInt'];
  mapLeaderboardId?: Maybe<Scalars['BigInt']>;
  mods?: Maybe<Scalars['String']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `PlayerDatum` that is related to this `ScoreDataHistory`. */
  player?: Maybe<PlayerDatum>;
  playerId?: Maybe<Scalars['BigInt']>;
  score: Scalars['Int'];
  scoreId: Scalars['BigInt'];
  timeSet?: Maybe<Scalars['Datetime']>;
  unmodififiedScore: Scalars['Int'];
  weightedAp?: Maybe<Scalars['Float']>;
};

/**
 * A condition to be used against `ScoreDataHistory` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ScoreDataHistoryCondition = {
  /** Checks for equality with the object’s `accuracy` field. */
  accuracy?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `ap` field. */
  ap?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `mapLeaderboardId` field. */
  mapLeaderboardId?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `mods` field. */
  mods?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `playerId` field. */
  playerId?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `score` field. */
  score?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `scoreId` field. */
  scoreId?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `timeSet` field. */
  timeSet?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `unmodififiedScore` field. */
  unmodififiedScore?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `weightedAp` field. */
  weightedAp?: InputMaybe<Scalars['Float']>;
};

/** An input for mutations affecting `ScoreDataHistory` */
export type ScoreDataHistoryInput = {
  accuracy?: InputMaybe<Scalars['Float']>;
  ap?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['BigInt']>;
  mapLeaderboardId?: InputMaybe<Scalars['BigInt']>;
  mods?: InputMaybe<Scalars['String']>;
  playerId?: InputMaybe<Scalars['BigInt']>;
  score: Scalars['Int'];
  scoreId: Scalars['BigInt'];
  timeSet?: InputMaybe<Scalars['Datetime']>;
  unmodififiedScore: Scalars['Int'];
  weightedAp?: InputMaybe<Scalars['Float']>;
};

/** Represents an update to a `ScoreDataHistory`. Fields that are set will be updated. */
export type ScoreDataHistoryPatch = {
  accuracy?: InputMaybe<Scalars['Float']>;
  ap?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['BigInt']>;
  mapLeaderboardId?: InputMaybe<Scalars['BigInt']>;
  mods?: InputMaybe<Scalars['String']>;
  playerId?: InputMaybe<Scalars['BigInt']>;
  score?: InputMaybe<Scalars['Int']>;
  scoreId?: InputMaybe<Scalars['BigInt']>;
  timeSet?: InputMaybe<Scalars['Datetime']>;
  unmodififiedScore?: InputMaybe<Scalars['Int']>;
  weightedAp?: InputMaybe<Scalars['Float']>;
};

/** Methods to use when ordering `ScoreDatum`. */
export enum ScoreDataOrderBy {
  AccuracyAsc = 'ACCURACY_ASC',
  AccuracyDesc = 'ACCURACY_DESC',
  ApAsc = 'AP_ASC',
  ApDesc = 'AP_DESC',
  IsRankedScoreAsc = 'IS_RANKED_SCORE_ASC',
  IsRankedScoreDesc = 'IS_RANKED_SCORE_DESC',
  MapLeaderboardIdAsc = 'MAP_LEADERBOARD_ID_ASC',
  MapLeaderboardIdDesc = 'MAP_LEADERBOARD_ID_DESC',
  ModsAsc = 'MODS_ASC',
  ModsDesc = 'MODS_DESC',
  Natural = 'NATURAL',
  PlayerIdAsc = 'PLAYER_ID_ASC',
  PlayerIdDesc = 'PLAYER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RankWhenScoresSetAsc = 'RANK_WHEN_SCORES_SET_ASC',
  RankWhenScoresSetDesc = 'RANK_WHEN_SCORES_SET_DESC',
  ScoreAsc = 'SCORE_ASC',
  ScoreDesc = 'SCORE_DESC',
  ScoreIdAsc = 'SCORE_ID_ASC',
  ScoreIdDesc = 'SCORE_ID_DESC',
  TimeSetAsc = 'TIME_SET_ASC',
  TimeSetDesc = 'TIME_SET_DESC',
  UnmodififiedScoreAsc = 'UNMODIFIFIED_SCORE_ASC',
  UnmodififiedScoreDesc = 'UNMODIFIFIED_SCORE_DESC',
  WeightedApAsc = 'WEIGHTED_AP_ASC',
  WeightedApDesc = 'WEIGHTED_AP_DESC'
}

export type ScoreDatum = Node & {
  __typename?: 'ScoreDatum';
  accuracy?: Maybe<Scalars['Float']>;
  ap?: Maybe<Scalars['Float']>;
  isRankedScore: Scalars['Boolean'];
  mapLeaderboardId?: Maybe<Scalars['BigInt']>;
  mods?: Maybe<Scalars['String']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `PlayerDatum` that is related to this `ScoreDatum`. */
  player?: Maybe<PlayerDatum>;
  playerId?: Maybe<Scalars['BigInt']>;
  rankWhenScoresSet: Scalars['Int'];
  score: Scalars['Int'];
  scoreId: Scalars['BigInt'];
  timeSet?: Maybe<Scalars['Datetime']>;
  unmodififiedScore: Scalars['Int'];
  weightedAp?: Maybe<Scalars['Float']>;
};

/**
 * A condition to be used against `ScoreDatum` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ScoreDatumCondition = {
  /** Checks for equality with the object’s `accuracy` field. */
  accuracy?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `ap` field. */
  ap?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `isRankedScore` field. */
  isRankedScore?: InputMaybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `mapLeaderboardId` field. */
  mapLeaderboardId?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `mods` field. */
  mods?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `playerId` field. */
  playerId?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `rankWhenScoresSet` field. */
  rankWhenScoresSet?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `score` field. */
  score?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `scoreId` field. */
  scoreId?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `timeSet` field. */
  timeSet?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `unmodififiedScore` field. */
  unmodififiedScore?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `weightedAp` field. */
  weightedAp?: InputMaybe<Scalars['Float']>;
};

/** An input for mutations affecting `ScoreDatum` */
export type ScoreDatumInput = {
  accuracy?: InputMaybe<Scalars['Float']>;
  ap?: InputMaybe<Scalars['Float']>;
  isRankedScore?: InputMaybe<Scalars['Boolean']>;
  mapLeaderboardId?: InputMaybe<Scalars['BigInt']>;
  mods?: InputMaybe<Scalars['String']>;
  playerId?: InputMaybe<Scalars['BigInt']>;
  rankWhenScoresSet: Scalars['Int'];
  score: Scalars['Int'];
  scoreId: Scalars['BigInt'];
  timeSet?: InputMaybe<Scalars['Datetime']>;
  unmodififiedScore: Scalars['Int'];
  weightedAp?: InputMaybe<Scalars['Float']>;
};

/** Represents an update to a `ScoreDatum`. Fields that are set will be updated. */
export type ScoreDatumPatch = {
  accuracy?: InputMaybe<Scalars['Float']>;
  ap?: InputMaybe<Scalars['Float']>;
  isRankedScore?: InputMaybe<Scalars['Boolean']>;
  mapLeaderboardId?: InputMaybe<Scalars['BigInt']>;
  mods?: InputMaybe<Scalars['String']>;
  playerId?: InputMaybe<Scalars['BigInt']>;
  rankWhenScoresSet?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['Int']>;
  scoreId?: InputMaybe<Scalars['BigInt']>;
  timeSet?: InputMaybe<Scalars['Datetime']>;
  unmodififiedScore?: InputMaybe<Scalars['Int']>;
  weightedAp?: InputMaybe<Scalars['Float']>;
};

export type Song = Node & {
  __typename?: 'Song';
  /** Reads and enables pagination through a set of `BeatMap`. */
  beatMapsBySong: BeatMapsConnection;
  beatSaverKey?: Maybe<Scalars['String']>;
  levelAuthorName?: Maybe<Scalars['String']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  songAuthorName?: Maybe<Scalars['String']>;
  songHash: Scalars['String'];
  songName?: Maybe<Scalars['String']>;
  songSubName?: Maybe<Scalars['String']>;
};


export type SongBeatMapsBySongArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<BeatMapCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BeatMapsOrderBy>>;
};

/** A condition to be used against `Song` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type SongCondition = {
  /** Checks for equality with the object’s `beatSaverKey` field. */
  beatSaverKey?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `levelAuthorName` field. */
  levelAuthorName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `songAuthorName` field. */
  songAuthorName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `songHash` field. */
  songHash?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `songName` field. */
  songName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `songSubName` field. */
  songSubName?: InputMaybe<Scalars['String']>;
};

/** An input for mutations affecting `Song` */
export type SongInput = {
  beatSaverKey?: InputMaybe<Scalars['String']>;
  levelAuthorName?: InputMaybe<Scalars['String']>;
  songAuthorName?: InputMaybe<Scalars['String']>;
  songHash: Scalars['String'];
  songName?: InputMaybe<Scalars['String']>;
  songSubName?: InputMaybe<Scalars['String']>;
};

/** Represents an update to a `Song`. Fields that are set will be updated. */
export type SongPatch = {
  beatSaverKey?: InputMaybe<Scalars['String']>;
  levelAuthorName?: InputMaybe<Scalars['String']>;
  songAuthorName?: InputMaybe<Scalars['String']>;
  songHash?: InputMaybe<Scalars['String']>;
  songName?: InputMaybe<Scalars['String']>;
  songSubName?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of `Song` values. */
export type SongsConnection = {
  __typename?: 'SongsConnection';
  /** A list of edges which contains the `Song` and cursor to aid in pagination. */
  edges: Array<SongsEdge>;
  /** A list of `Song` objects. */
  nodes: Array<Song>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Song` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Song` edge in the connection. */
export type SongsEdge = {
  __typename?: 'SongsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Song` at the end of the edge. */
  node: Song;
};

/** Methods to use when ordering `Song`. */
export enum SongsOrderBy {
  BeatSaverKeyAsc = 'BEAT_SAVER_KEY_ASC',
  BeatSaverKeyDesc = 'BEAT_SAVER_KEY_DESC',
  LevelAuthorNameAsc = 'LEVEL_AUTHOR_NAME_ASC',
  LevelAuthorNameDesc = 'LEVEL_AUTHOR_NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SongAuthorNameAsc = 'SONG_AUTHOR_NAME_ASC',
  SongAuthorNameDesc = 'SONG_AUTHOR_NAME_DESC',
  SongHashAsc = 'SONG_HASH_ASC',
  SongHashDesc = 'SONG_HASH_DESC',
  SongNameAsc = 'SONG_NAME_ASC',
  SongNameDesc = 'SONG_NAME_DESC',
  SongSubNameAsc = 'SONG_SUB_NAME_ASC',
  SongSubNameDesc = 'SONG_SUB_NAME_DESC'
}

export type StaffUser = Node & {
  __typename?: 'StaffUser';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  password?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

/**
 * A condition to be used against `StaffUser` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type StaffUserCondition = {
  /** Checks for equality with the object’s `password` field. */
  password?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `role` field. */
  role?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `username` field. */
  username?: InputMaybe<Scalars['String']>;
};

/** An input for mutations affecting `StaffUser` */
export type StaffUserInput = {
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

/** Represents an update to a `StaffUser`. Fields that are set will be updated. */
export type StaffUserPatch = {
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of `StaffUser` values. */
export type StaffUsersConnection = {
  __typename?: 'StaffUsersConnection';
  /** A list of edges which contains the `StaffUser` and cursor to aid in pagination. */
  edges: Array<StaffUsersEdge>;
  /** A list of `StaffUser` objects. */
  nodes: Array<StaffUser>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `StaffUser` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `StaffUser` edge in the connection. */
export type StaffUsersEdge = {
  __typename?: 'StaffUsersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `StaffUser` at the end of the edge. */
  node: StaffUser;
};

/** Methods to use when ordering `StaffUser`. */
export enum StaffUsersOrderBy {
  Natural = 'NATURAL',
  PasswordAsc = 'PASSWORD_ASC',
  PasswordDesc = 'PASSWORD_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RoleAsc = 'ROLE_ASC',
  RoleDesc = 'ROLE_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC'
}

/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type Subscription = {
  __typename?: 'Subscription';
  /** Reads and enables pagination through a set of `AccSaberScore`. (live) */
  accSaberScores?: Maybe<AccSaberScoresConnection>;
  /**  (live) */
  beatMap?: Maybe<BeatMap>;
  /** Reads a single `BeatMap` using its globally unique `ID`. (live) */
  beatMapByNodeId?: Maybe<BeatMap>;
  /** Reads and enables pagination through a set of `BeatMap`. (live) */
  beatMaps?: Maybe<BeatMapsConnection>;
  /** Reads and enables pagination through a set of `Category`. (live) */
  categories?: Maybe<CategoriesConnection>;
  /**  (live) */
  category?: Maybe<Category>;
  /** Reads and enables pagination through a set of `CategoryAccSaberPlayer`. (live) */
  categoryAccSaberPlayers?: Maybe<CategoryAccSaberPlayersConnection>;
  /**  (live) */
  categoryByCategoryName?: Maybe<Category>;
  /** Reads a single `Category` using its globally unique `ID`. (live) */
  categoryByNodeId?: Maybe<Category>;
  /**  (live) */
  databasechangeloglock?: Maybe<Databasechangeloglock>;
  /** Reads a single `Databasechangeloglock` using its globally unique `ID`. (live) */
  databasechangeloglockByNodeId?: Maybe<Databasechangeloglock>;
  /** Reads and enables pagination through a set of `Databasechangeloglock`. (live) */
  databasechangeloglocks?: Maybe<DatabasechangeloglocksConnection>;
  /** Reads and enables pagination through a set of `Databasechangelog`. (live) */
  databasechangelogs?: Maybe<DatabasechangelogsConnection>;
  /** Fetches an object given its globally unique `ID`. (live) */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. (live) */
  nodeId: Scalars['ID'];
  /** Reads and enables pagination through a set of `OverallAccSaberPlayer`. (live) */
  overallAccSaberPlayers?: Maybe<OverallAccSaberPlayersConnection>;
  /**  (live) */
  playerCategoryStat?: Maybe<PlayerCategoryStat>;
  /** Reads a single `PlayerCategoryStat` using its globally unique `ID`. (live) */
  playerCategoryStatByNodeId?: Maybe<PlayerCategoryStat>;
  /** Reads and enables pagination through a set of `PlayerCategoryStat`. (live) */
  playerCategoryStats?: Maybe<PlayerCategoryStatsConnection>;
  /** Reads and enables pagination through a set of `PlayerDatum`. (live) */
  playerData?: Maybe<PlayerDataConnection>;
  /**  (live) */
  playerDatum?: Maybe<PlayerDatum>;
  /** Reads a single `PlayerDatum` using its globally unique `ID`. (live) */
  playerDatumByNodeId?: Maybe<PlayerDatum>;
  /** Reads and enables pagination through a set of `PlayerRankHistory`. (live) */
  playerRankHistories?: Maybe<PlayerRankHistoriesConnection>;
  /**  (live) */
  playerRankHistory?: Maybe<PlayerRankHistory>;
  /** Reads a single `PlayerRankHistory` using its globally unique `ID`. (live) */
  playerRankHistoryByNodeId?: Maybe<PlayerRankHistory>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form. (live)
   */
  query: Query;
  /** Reads and enables pagination through a set of `ScoreDatum`. (live) */
  scoreData?: Maybe<ScoreDataConnection>;
  /** Reads and enables pagination through a set of `ScoreDataHistory`. (live) */
  scoreDataHistories?: Maybe<ScoreDataHistoriesConnection>;
  /**  (live) */
  scoreDataHistory?: Maybe<ScoreDataHistory>;
  /** Reads a single `ScoreDataHistory` using its globally unique `ID`. (live) */
  scoreDataHistoryByNodeId?: Maybe<ScoreDataHistory>;
  /**  (live) */
  scoreDatum?: Maybe<ScoreDatum>;
  /** Reads a single `ScoreDatum` using its globally unique `ID`. (live) */
  scoreDatumByNodeId?: Maybe<ScoreDatum>;
  /**  (live) */
  song?: Maybe<Song>;
  /** Reads a single `Song` using its globally unique `ID`. (live) */
  songByNodeId?: Maybe<Song>;
  /** Reads and enables pagination through a set of `Song`. (live) */
  songs?: Maybe<SongsConnection>;
  /**  (live) */
  staffUser?: Maybe<StaffUser>;
  /** Reads a single `StaffUser` using its globally unique `ID`. (live) */
  staffUserByNodeId?: Maybe<StaffUser>;
  /** Reads and enables pagination through a set of `StaffUser`. (live) */
  staffUsers?: Maybe<StaffUsersConnection>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionAccSaberScoresArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<AccSaberScoreCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AccSaberScoresOrderBy>>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionBeatMapArgs = {
  leaderboardId: Scalars['BigInt'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionBeatMapByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionBeatMapsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<BeatMapCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BeatMapsOrderBy>>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionCategoriesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<CategoryCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CategoriesOrderBy>>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionCategoryArgs = {
  id: Scalars['BigInt'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionCategoryAccSaberPlayersArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<CategoryAccSaberPlayerCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CategoryAccSaberPlayersOrderBy>>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionCategoryByCategoryNameArgs = {
  categoryName: Scalars['String'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionCategoryByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionDatabasechangeloglockArgs = {
  id: Scalars['Int'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionDatabasechangeloglockByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionDatabasechangeloglocksArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<DatabasechangeloglockCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DatabasechangeloglocksOrderBy>>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionDatabasechangelogsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<DatabasechangelogCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DatabasechangelogsOrderBy>>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionNodeArgs = {
  nodeId: Scalars['ID'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionOverallAccSaberPlayersArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<OverallAccSaberPlayerCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OverallAccSaberPlayersOrderBy>>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionPlayerCategoryStatArgs = {
  categoryId: Scalars['BigInt'];
  playerId: Scalars['BigInt'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionPlayerCategoryStatByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionPlayerCategoryStatsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<PlayerCategoryStatCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PlayerCategoryStatsOrderBy>>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionPlayerDataArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<PlayerDatumCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PlayerDataOrderBy>>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionPlayerDatumArgs = {
  playerId: Scalars['BigInt'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionPlayerDatumByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionPlayerRankHistoriesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<PlayerRankHistoryCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PlayerRankHistoriesOrderBy>>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionPlayerRankHistoryArgs = {
  categoryId: Scalars['BigInt'];
  date: Scalars['Date'];
  playerId: Scalars['BigInt'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionPlayerRankHistoryByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionScoreDataArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ScoreDatumCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ScoreDataOrderBy>>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionScoreDataHistoriesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ScoreDataHistoryCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ScoreDataHistoriesOrderBy>>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionScoreDataHistoryArgs = {
  id: Scalars['BigInt'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionScoreDataHistoryByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionScoreDatumArgs = {
  scoreId: Scalars['BigInt'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionScoreDatumByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionSongArgs = {
  songHash: Scalars['String'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionSongByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionSongsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<SongCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<SongsOrderBy>>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionStaffUserArgs = {
  username: Scalars['String'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionStaffUserByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionStaffUsersArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<StaffUserCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<StaffUsersOrderBy>>;
};

/** All input for the `updateBeatMapByNodeId` mutation. */
export type UpdateBeatMapByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `BeatMap` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `BeatMap` being updated. */
  patch: BeatMapPatch;
};

/** All input for the `updateBeatMap` mutation. */
export type UpdateBeatMapInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  leaderboardId: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `BeatMap` being updated. */
  patch: BeatMapPatch;
};

/** The output of our update `BeatMap` mutation. */
export type UpdateBeatMapPayload = {
  __typename?: 'UpdateBeatMapPayload';
  /** The `BeatMap` that was updated by this mutation. */
  beatMap?: Maybe<BeatMap>;
  /** An edge for our `BeatMap`. May be used by Relay 1. */
  beatMapEdge?: Maybe<BeatMapsEdge>;
  /** Reads a single `Category` that is related to this `BeatMap`. */
  category?: Maybe<Category>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Song` that is related to this `BeatMap`. */
  songBySong?: Maybe<Song>;
};


/** The output of our update `BeatMap` mutation. */
export type UpdateBeatMapPayloadBeatMapEdgeArgs = {
  orderBy?: InputMaybe<Array<BeatMapsOrderBy>>;
};

/** All input for the `updateCategoryByCategoryName` mutation. */
export type UpdateCategoryByCategoryNameInput = {
  categoryName: Scalars['String'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Category` being updated. */
  patch: CategoryPatch;
};

/** All input for the `updateCategoryByNodeId` mutation. */
export type UpdateCategoryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Category` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Category` being updated. */
  patch: CategoryPatch;
};

/** All input for the `updateCategory` mutation. */
export type UpdateCategoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `Category` being updated. */
  patch: CategoryPatch;
};

/** The output of our update `Category` mutation. */
export type UpdateCategoryPayload = {
  __typename?: 'UpdateCategoryPayload';
  /** The `Category` that was updated by this mutation. */
  category?: Maybe<Category>;
  /** An edge for our `Category`. May be used by Relay 1. */
  categoryEdge?: Maybe<CategoriesEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Category` mutation. */
export type UpdateCategoryPayloadCategoryEdgeArgs = {
  orderBy?: InputMaybe<Array<CategoriesOrderBy>>;
};

/** All input for the `updateDatabasechangeloglockByNodeId` mutation. */
export type UpdateDatabasechangeloglockByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Databasechangeloglock` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Databasechangeloglock` being updated. */
  patch: DatabasechangeloglockPatch;
};

/** All input for the `updateDatabasechangeloglock` mutation. */
export type UpdateDatabasechangeloglockInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object where the defined keys will be set on the `Databasechangeloglock` being updated. */
  patch: DatabasechangeloglockPatch;
};

/** The output of our update `Databasechangeloglock` mutation. */
export type UpdateDatabasechangeloglockPayload = {
  __typename?: 'UpdateDatabasechangeloglockPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Databasechangeloglock` that was updated by this mutation. */
  databasechangeloglock?: Maybe<Databasechangeloglock>;
  /** An edge for our `Databasechangeloglock`. May be used by Relay 1. */
  databasechangeloglockEdge?: Maybe<DatabasechangeloglocksEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Databasechangeloglock` mutation. */
export type UpdateDatabasechangeloglockPayloadDatabasechangeloglockEdgeArgs = {
  orderBy?: InputMaybe<Array<DatabasechangeloglocksOrderBy>>;
};

/** All input for the `updatePlayerCategoryStatByNodeId` mutation. */
export type UpdatePlayerCategoryStatByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PlayerCategoryStat` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PlayerCategoryStat` being updated. */
  patch: PlayerCategoryStatPatch;
};

/** All input for the `updatePlayerCategoryStat` mutation. */
export type UpdatePlayerCategoryStatInput = {
  categoryId: Scalars['BigInt'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `PlayerCategoryStat` being updated. */
  patch: PlayerCategoryStatPatch;
  playerId: Scalars['BigInt'];
};

/** The output of our update `PlayerCategoryStat` mutation. */
export type UpdatePlayerCategoryStatPayload = {
  __typename?: 'UpdatePlayerCategoryStatPayload';
  /** Reads a single `Category` that is related to this `PlayerCategoryStat`. */
  category?: Maybe<Category>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `PlayerDatum` that is related to this `PlayerCategoryStat`. */
  player?: Maybe<PlayerDatum>;
  /** The `PlayerCategoryStat` that was updated by this mutation. */
  playerCategoryStat?: Maybe<PlayerCategoryStat>;
  /** An edge for our `PlayerCategoryStat`. May be used by Relay 1. */
  playerCategoryStatEdge?: Maybe<PlayerCategoryStatsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `PlayerCategoryStat` mutation. */
export type UpdatePlayerCategoryStatPayloadPlayerCategoryStatEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerCategoryStatsOrderBy>>;
};

/** All input for the `updatePlayerDatumByNodeId` mutation. */
export type UpdatePlayerDatumByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PlayerDatum` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PlayerDatum` being updated. */
  patch: PlayerDatumPatch;
};

/** All input for the `updatePlayerDatum` mutation. */
export type UpdatePlayerDatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `PlayerDatum` being updated. */
  patch: PlayerDatumPatch;
  playerId: Scalars['BigInt'];
};

/** The output of our update `PlayerDatum` mutation. */
export type UpdatePlayerDatumPayload = {
  __typename?: 'UpdatePlayerDatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PlayerDatum` that was updated by this mutation. */
  playerDatum?: Maybe<PlayerDatum>;
  /** An edge for our `PlayerDatum`. May be used by Relay 1. */
  playerDatumEdge?: Maybe<PlayerDataEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `PlayerDatum` mutation. */
export type UpdatePlayerDatumPayloadPlayerDatumEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerDataOrderBy>>;
};

/** All input for the `updatePlayerRankHistoryByNodeId` mutation. */
export type UpdatePlayerRankHistoryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PlayerRankHistory` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PlayerRankHistory` being updated. */
  patch: PlayerRankHistoryPatch;
};

/** All input for the `updatePlayerRankHistory` mutation. */
export type UpdatePlayerRankHistoryInput = {
  categoryId: Scalars['BigInt'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  date: Scalars['Date'];
  /** An object where the defined keys will be set on the `PlayerRankHistory` being updated. */
  patch: PlayerRankHistoryPatch;
  playerId: Scalars['BigInt'];
};

/** The output of our update `PlayerRankHistory` mutation. */
export type UpdatePlayerRankHistoryPayload = {
  __typename?: 'UpdatePlayerRankHistoryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PlayerRankHistory` that was updated by this mutation. */
  playerRankHistory?: Maybe<PlayerRankHistory>;
  /** An edge for our `PlayerRankHistory`. May be used by Relay 1. */
  playerRankHistoryEdge?: Maybe<PlayerRankHistoriesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `PlayerRankHistory` mutation. */
export type UpdatePlayerRankHistoryPayloadPlayerRankHistoryEdgeArgs = {
  orderBy?: InputMaybe<Array<PlayerRankHistoriesOrderBy>>;
};

/** All input for the `updateScoreDataHistoryByNodeId` mutation. */
export type UpdateScoreDataHistoryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ScoreDataHistory` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `ScoreDataHistory` being updated. */
  patch: ScoreDataHistoryPatch;
};

/** All input for the `updateScoreDataHistory` mutation. */
export type UpdateScoreDataHistoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['BigInt'];
  /** An object where the defined keys will be set on the `ScoreDataHistory` being updated. */
  patch: ScoreDataHistoryPatch;
};

/** The output of our update `ScoreDataHistory` mutation. */
export type UpdateScoreDataHistoryPayload = {
  __typename?: 'UpdateScoreDataHistoryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `PlayerDatum` that is related to this `ScoreDataHistory`. */
  player?: Maybe<PlayerDatum>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `ScoreDataHistory` that was updated by this mutation. */
  scoreDataHistory?: Maybe<ScoreDataHistory>;
  /** An edge for our `ScoreDataHistory`. May be used by Relay 1. */
  scoreDataHistoryEdge?: Maybe<ScoreDataHistoriesEdge>;
};


/** The output of our update `ScoreDataHistory` mutation. */
export type UpdateScoreDataHistoryPayloadScoreDataHistoryEdgeArgs = {
  orderBy?: InputMaybe<Array<ScoreDataHistoriesOrderBy>>;
};

/** All input for the `updateScoreDatumByNodeId` mutation. */
export type UpdateScoreDatumByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ScoreDatum` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `ScoreDatum` being updated. */
  patch: ScoreDatumPatch;
};

/** All input for the `updateScoreDatum` mutation. */
export type UpdateScoreDatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `ScoreDatum` being updated. */
  patch: ScoreDatumPatch;
  scoreId: Scalars['BigInt'];
};

/** The output of our update `ScoreDatum` mutation. */
export type UpdateScoreDatumPayload = {
  __typename?: 'UpdateScoreDatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `PlayerDatum` that is related to this `ScoreDatum`. */
  player?: Maybe<PlayerDatum>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `ScoreDatum` that was updated by this mutation. */
  scoreDatum?: Maybe<ScoreDatum>;
  /** An edge for our `ScoreDatum`. May be used by Relay 1. */
  scoreDatumEdge?: Maybe<ScoreDataEdge>;
};


/** The output of our update `ScoreDatum` mutation. */
export type UpdateScoreDatumPayloadScoreDatumEdgeArgs = {
  orderBy?: InputMaybe<Array<ScoreDataOrderBy>>;
};

/** All input for the `updateSongByNodeId` mutation. */
export type UpdateSongByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Song` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Song` being updated. */
  patch: SongPatch;
};

/** All input for the `updateSong` mutation. */
export type UpdateSongInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Song` being updated. */
  patch: SongPatch;
  songHash: Scalars['String'];
};

/** The output of our update `Song` mutation. */
export type UpdateSongPayload = {
  __typename?: 'UpdateSongPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Song` that was updated by this mutation. */
  song?: Maybe<Song>;
  /** An edge for our `Song`. May be used by Relay 1. */
  songEdge?: Maybe<SongsEdge>;
};


/** The output of our update `Song` mutation. */
export type UpdateSongPayloadSongEdgeArgs = {
  orderBy?: InputMaybe<Array<SongsOrderBy>>;
};

/** All input for the `updateStaffUserByNodeId` mutation. */
export type UpdateStaffUserByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `StaffUser` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `StaffUser` being updated. */
  patch: StaffUserPatch;
};

/** All input for the `updateStaffUser` mutation. */
export type UpdateStaffUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `StaffUser` being updated. */
  patch: StaffUserPatch;
  username: Scalars['String'];
};

/** The output of our update `StaffUser` mutation. */
export type UpdateStaffUserPayload = {
  __typename?: 'UpdateStaffUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `StaffUser` that was updated by this mutation. */
  staffUser?: Maybe<StaffUser>;
  /** An edge for our `StaffUser`. May be used by Relay 1. */
  staffUserEdge?: Maybe<StaffUsersEdge>;
};


/** The output of our update `StaffUser` mutation. */
export type UpdateStaffUserPayloadStaffUserEdgeArgs = {
  orderBy?: InputMaybe<Array<StaffUsersOrderBy>>;
};

export type RankHistoryDayFragment = { __typename?: 'PlayerRankHistory', date: any, ranking: number, rankedPlays: number, ap: number };

export type PlayerLayoutQueryVariables = Exact<{
  playerId: Scalars['BigInt'];
  category?: InputMaybe<Scalars['BigInt']>;
}>;


export type PlayerLayoutQuery = { __typename?: 'Query', playerRankHistories?: { __typename?: 'PlayerRankHistoriesConnection', nodes: Array<{ __typename?: 'PlayerRankHistory', date: any, ranking: number, rankedPlays: number, ap: number }> } | null };

export const RankHistoryDayFragmentDoc = gql`
    fragment RankHistoryDay on PlayerRankHistory {
  date
  ranking
  rankedPlays
  ap
}
    `;
export const PlayerLayoutDocument = gql`
    query playerLayout($playerId: BigInt!, $category: BigInt) {
  playerRankHistories(
    condition: {playerId: $playerId, categoryId: $category}
    last: 30
  ) {
    nodes {
      ...RankHistoryDay
    }
  }
}
    ${RankHistoryDayFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    playerLayout(variables: PlayerLayoutQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PlayerLayoutQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PlayerLayoutQuery>(PlayerLayoutDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'playerLayout', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
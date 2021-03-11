// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from "vue";

declare module "../components/TimelineFooter.vue" {
  interface Commit {
    id: string;
    short_id: string;
    created_at: string;
    parent_ids: Array<string>;
    title: string;
    message: string;
    author_name: string;
    author_email: string;
    authored_date: string;
    committer_name: string;
    committer_email: string;
    committer_date: string;
    web_url: string;
  }
}

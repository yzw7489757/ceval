module.exports = {
    "types": [
      { "type": "feat", "section": "Features" },
      { "type": "fix", "section": "Bug Fixes" },
      { "type": "chore", "hidden": true },
      { "type": "docs", "hidden": true },
      { "type": "style", "hidden": true },
      { "type": "refactor", "hidden": true },
      { "type": "perf", "hidden": true },
      { "type": "test", "hidden": true }
  ],
  "commintUrlFormat": "{{host}}/{{owner}}/{{repository}}/commit/{{hash}}",
  "compareUrlFormat": "{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}",
  "issueUrlFormat": "{{host}}/{{owner}}/{{repository}}/issues/{{id}}",
  "userUrlFormat": "{{host}}/{{user}}",
  "releaseCommitMessageFormat": "chore(release): {{currentTag}}",
  "issuePrefixes": ["#"]
}
// release -- --release-as major|minor|patch|x.x.x
// standard-version -p beta -r major|minor|patch|x.x.x

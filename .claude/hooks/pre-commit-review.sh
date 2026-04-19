#!/usr/bin/env bash
# Enforce /review-pr before git commit.
# Allow when .git/.claude-review-ok contains sha256 of current staged diff.
set -u

input=$(cat)
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // ""')

if ! printf '%s' "$cmd" | grep -Eq '(^|[[:space:];&|])git[[:space:]]+commit($|[[:space:]])'; then
  exit 0
fi

staged_hash=$(git diff --cached 2>/dev/null | shasum -a 256 | awk '{print $1}')
marker=".git/.claude-review-ok"

if [ -f "$marker" ] && [ "$(cat "$marker" 2>/dev/null)" = "$staged_hash" ]; then
  rm -f "$marker"
  exit 0
fi

jq -n --arg hash "$staged_hash" '{
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    permissionDecision: "deny",
    permissionDecisionReason: ("커밋 차단됨: /review-pr 을 먼저 실행하세요.\n\n리뷰 후 blocker가 없으면 다음 명령으로 마커 생성 후 다시 커밋:\n  git diff --cached | shasum -a 256 | awk '\''{print $1}'\'' > .git/.claude-review-ok\n\n(현재 staged hash: " + $hash + ")\n마커는 해당 staged 상태에서 1회만 유효합니다.")
  }
}'

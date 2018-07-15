# Badgen

Fast badge generating service. Built with [badgen](https://github.com/amio/badgen).

## Usage

```
https://badgen.now.sh/badge/:subject/:status/:color
                      ──┬──  ───┬───  ──┬───  ──┬──
                        │       │       │       └─ RGB / Color Name
                        │      TEXT    TEXT       ( optional )
                        │
                     "badge" - default(static) badge generator
```

Available color names:

![](/badge/color/blue/blue)
![](/badge/color/cyan/cyan)
![](/badge/color/green/green)
![](/badge/color/yellow/yellow)
![](/badge/color/orange/orange)
![](/badge/color/red/red)
![](/badge/color/pink/pink)
![](/badge/color/purple/purple)
![](/badge/color/grey/grey)

## Examples

#### Static Badge

| Preview | URL |
| --- | --- |
|![](/badge/chat/gitter/purple) | [/badge/chat/gitter/purple](/badge/chat/gitter/purple) |
|![](/badge/style/standard/f2a) | [/badge/style/standard/f2a](/badge/style/standard/f2a) |
|![](/badge/stars/★★★★☆) | [/badge/stars/★★★★☆](/badge/stars/★★★★☆) |
|![](/badge/license/Apache-2.0/blue) | [/badge/license/Apache-2.0/blue](/badge/license/Apache-2.0/blue) |
|![](/list/platform/ios,macos,tvos/grey) | [/list/platform/ios,macos,tvos/grey](/list/platform/ios,macos,tvos/grey) |

#### Live Badge

| Keyword | Preview | URL |
| --- | --- | --- |
| npm version | ![](/npm/v/express) | [/npm/v/express](/npm/v/express) |
| npm dl/day | ![](/npm/dd/express) | [/npm/dd/express](/npm/dd/express) |
| npm dl/week | ![](/npm/dw/express) | [/npm/dw/express](/npm/dw/express) |
| npm dl/month | ![](/npm/dm/express) | [/npm/dm/express](/npm/dm/express) |
| crates version | ![](/crates/v/regex) | [/crates/v/regex](/crates/v/regex) |
| crates downloads | ![](/crates/d/regex) | [/crates/d/regex](/crates/d/regex) |
| crates downloads latest | ![](/crates/dl/regex) | [/crates/dl/regex](/crates/dl/regex) |
| travis | ![](/travis/amio/micro-cors) | [/travis/amio/micro-cors](/travis/amio/micro-cors) |
| travis (org) | ![](/travis-org/styfle/packagephobia) | [/travis-org/styfle/packagephobia](/travis-org/styfle/packagephobia) |
| circleci | ![](/circleci/github/amio/now-go) | [/circleci/github/amio/now-go](/circleci/github/amio/now-go) |
| appveyor | ![](/appveyor/github/gruntjs/grunt) | [/appveyor/github/gruntjs/grunt](/appveyor/github/gruntjs/grunt) |

## About

Made with ❤️ by [Amio](https://github.com/amio)
<span style="float:right; color: #AAA">
  <a href="https://github.com/amio/badgen-service">badgen-service</a> |
  <a href="https://github.com/amio/badgen">badgen</a>
</span>

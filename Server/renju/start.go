package main

import (
	"github.com/nothollyhigh/kiss/util"
	"kisscluster/renju/app"
	"os"
	"syscall"
)

func main() {
	app.Startup()

	util.HandleSignal(func(sig os.Signal) {
		if sig == syscall.SIGTERM || sig == syscall.SIGINT {
			//app.Stop()
			os.Exit(0)
		}
	})
}

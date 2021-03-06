//
// This file is licensed under the MIT X11 open source license.
// http://www.opensource.org/licenses/mit-license.php
//
// Authors: Aaron Bockover <abockover@novell.com>
//
// Copyright 2009 Novell, Inc.
// 

function MtkXaml (xaml, settings) {
    MtkWidget.call (this, settings);
    this.InitFromXaml (xaml);
    this.MapProperties (["Background"]);

    // TODO: Make these properties to QueueResize
    this.XAlign = 0.5;
    this.YAlign = 0.5;
    this.XPad = 0;
    this.YPad = 0;
    this.WidthRequest = 0;
    this.HeightRequest = 0;
    
    this.Override ("OnSizeRequest", function () {
        var request = {};
        request.Width = (this.WidthRequest > 0 ? this.WidthRequest : this.ActualWidth) + 2 * this.XPad;
        request.Height = (this.HeightRequest > 0 ? this.HeightRequest : this.ActualHeight) + 2 * this.YPad;
        return request;
    });

    this.Override ("OnSizeAllocate", function () {
        if (this.IsRealized) {
            if (this.ActualWidth == 0) {
                this.Xaml.Width = this.Allocation.Width - 2 * this.XPad;
            }

            if (this.ActualHeight == 0) {
                this.Xaml.Height = this.Allocation.Height - 2 * this.YPad;
            }

            this.Xaml["Canvas.Left"] = this.Allocation.Left + this.XPad +
                Math.round ((this.Allocation.Width - this.ActualWidth) * this.XAlign);
            this.Xaml["Canvas.Top"] = this.Allocation.Top + this.YPad + 
                Math.round ((this.Allocation.Height - this.ActualHeight) * this.YAlign);
        }
    });

    this.AfterConstructed ();
}


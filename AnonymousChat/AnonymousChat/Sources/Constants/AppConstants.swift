//
//  AppConstants.swift
//  AnonymousChat
//
//  Created by Александр on 19.09.2025.
//

struct AppConstants {
    /// Api-related constants, like urls.
    enum api {
        /// Link to HTTP-Api
        static var url: String { "http://localhost:4242" }
        /// Link to WebSockets endpoint
        static var wsUrl: String { "ws://localhost:4242" }
    }
}


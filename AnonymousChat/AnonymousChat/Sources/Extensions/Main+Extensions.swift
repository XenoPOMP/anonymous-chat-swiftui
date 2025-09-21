//
//  Main+Extensions.swift
//  AnonymousChat
//
//  Created by Александр on 21.09.2025.
//

import SwiftUI

struct ProdModifier: ViewModifier {
    @StateObject private var messageStore: MessageStore = .init()
    @StateObject private var wsManager: WSManager = .init()
    
    func body(content: Content) -> some View {
        content
            .onAppear {
                wsManager.connect()
            }
            .environmentObject(messageStore)
            .environmentObject(wsManager)
    }
}

/// ProdModifier func extension
extension View {
    @ViewBuilder
    func prod() -> some View {
        modifier(ProdModifier())
    }
}

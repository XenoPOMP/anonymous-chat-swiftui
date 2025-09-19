//
//  KeyboardView.swift
//  AnonymousChat
//
//  Created by Александр on 19.09.2025.
//

import SwiftUI

struct KeyboardView: View {
    @State private var message: String = ""
    
    var body: some View {
        VStack(spacing: 0) {
            Divider()
            
            HStack {
                let textFieldPadding: CGFloat = 10.0;
                let fieldHeight: CGFloat = 50.0
                
                TextField("Say something...", text: $message)
                    .padding(.vertical, textFieldPadding)
                    .padding(.horizontal, textFieldPadding * 2)
                    .frame(height: fieldHeight)
                    .background(Color(UIColor.secondarySystemBackground), in: .capsule)
                
                Button(action: {}) {
                    Image(systemName: "paperplane.fill")
                }
                .foregroundStyle(.primary)
                .frame(width: fieldHeight, height: fieldHeight, alignment: .center)
                .background(Color.accentColor, in: .circle)
            }
            .frame(maxWidth: .infinity)
            .padding(.horizontal)
            .padding(.vertical, 12)
        }
        .background(Color(UIColor.systemBackground))
    }
}

#Preview {
    Main()
        .environmentObject(MessageStore())
}

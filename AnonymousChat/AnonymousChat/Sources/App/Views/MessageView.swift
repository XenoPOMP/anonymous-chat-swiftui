//
//  MessageView.swift
//  AnonymousChat
//
//  Created by Александр on 19.09.2025.
//

import SwiftUI

struct MessageView: View {
    var isChained: Bool = false
    var data: ParsedMessageModel
    
    var body: some View {
        VStack {
            if !isChained {
                Text(data.generatedName)
                    .foregroundStyle(Color(hex: data.seededColor)!)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.top, 20)
            }
            
            Text(data.textContent)
                .frame(maxWidth: .infinity, alignment: .topLeading)
                .padding(.top, isChained ? 4 : 2)
        }
    }
}

#Preview {
    Main().prod()
}

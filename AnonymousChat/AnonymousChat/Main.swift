//
//  Main.swift
//  AnonymousChat
//
//  Created by Александр on 15.09.2025.
//

import SwiftUI
import Alamofire

struct Main: View {
    private var cookies: [HTTPCookie] {
        HTTPCookieStorage.shared.cookies ?? []
    }
    
    private var inoutUserId: String? {
        cookies.first(where: { $0.isHTTPOnly && $0.name == "inoutUserId" })?.value
    }
    
    private var isLogged: Bool {
        let _ = AF.request("\(AppConstants.api.url)/jump-in", method: .post).response { response in
            debugPrint(response)
        }
        
        return inoutUserId != nil
    }
    
    var body: some View {
        if !isLogged {
            ProgressView()
        }
        else {
            ChatView()
        }
    }
}

#Preview {
    Main()
        .environmentObject(MessageStore())
}

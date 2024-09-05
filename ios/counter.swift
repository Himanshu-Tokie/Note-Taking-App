//
//  counter.swift
//  NoteTaking
//
//  Created by Chicmic_Reacjs01 on 2024-06-21.
//

import Foundation

@objc(Counter)
class Counter: NSObject {
  @objc
    func constantsToExport() -> [AnyHashable : Any]! {
      return ["initialCount": 0]
    }
}
